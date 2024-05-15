import React, { useState, useEffect } from 'react';
import dummy from "../assests/annotation.png"
import { Box, IconButton, Select, InputLabel, FormControl, MenuItem, Tooltip, Button, CircularProgress } from '@mui/material';
import { GiGolfFlag } from "react-icons/gi";
import Annotation_Table from './Annotations';
import Annotations from './Annotation';

function ImageViewer() {
    const [imageUrl, setImageUrl] = useState('');
    const [slideDir, setSlideDir] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [annotaionTable, SetAnnotationTable] = useState([]);
    const [notesContent, setNotesContent] = useState('');
    const [infoContent, setInfoContent] = useState('');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [scanlens, setScanlens] = useState(20);
    const [img_width, setImg_width] = useState(13312);
    const [img_height, setImg_height] = useState(13312);
    const [mifwidth, setMifwidth] = useState(0);
    const [mifheight, setMifheight] = useState(0);
    const slideDirs = [
        { label: "SVS", value: "C:/Users/Ashish Lohia/Downloads/svs" },
        { label: "MDS_1", value: "C:/wsi" },
        { label: "MDS_2", value: "C:/Users/Ashish Lohia/Downloads/wetransfer_20x-slides_2024-05-01_0925/DENTINO-ENAMEL JUNCTION" },
        { label: "MDS_3", value: "C:/Users/Ashish Lohia/Downloads/keratosis lichenoides chronica (H-1630-24)-1/keratosis lichenoides chronica (H-1630-24)-1" },
    ];
    const [availableZoomOptions, setAvailableZoomOptions] = useState([2, 5, 10, 20, 40, 60, 80, 100]);
    const [annotationVisibility, setAnnotationVisibilty] = useState(true);
    console.log(annotationVisibility)


    useEffect(() => {
        if (slideDir) {
            // fetchImage();
            fetchNotes();
            fetchInfo();
        }
    }, [slideDir]);

    const fetchImage = () => {
        setIsLoading(true);
        fetch(`http://localhost:5000/api/get_image?slide_dir=${encodeURIComponent(slideDir)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
                const img = new Image();
                img.onload = function () {
                    const width = this.width;
                    const height = this.height;
                    setImg_height(height);
                    setImg_width(width);
                    setIsLoading(false);
                };
                img.src = url;
            })
            .catch(error => {
                console.error('There was a problem fetching the image:', error);
                setIsLoading(false);
            });
    };


    const fetchNotes = () => {
        fetch(`http://localhost:5000/api/get_notes?slide_dir=${encodeURIComponent(slideDir)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setNotesContent(data.notes);
            })
            .catch(error => {
                console.error('There was a problem fetching the notes:', error);
            });
    };

    const fetchInfo = () => {
        fetch(`http://localhost:5000/api/get_info?slide_dir=${encodeURIComponent(slideDir)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setInfoContent(data.info);
            })
            .catch(error => {
                console.error('There was a problem fetching the info:', error);
            });
    };

    useEffect(() => {
        const parseInfoContent = () => {
            const infoLines = infoContent.split('\n');
            let scanlensVal = 0;
            let mifwidthVal = 0;
            let mifheightVal = 0;
            infoLines.forEach(line => {
                if (line.includes('scanlens')) {
                    scanlensVal = parseFloat(line.split('=')[1]);
                } else if (line.includes('mifwidth')) {
                    mifwidthVal = parseInt(line.split('=')[1]);
                } else if (line.includes('mifheight')) {
                    mifheightVal = parseInt(line.split('=')[1]);
                }
            });
            setScanlens(scanlensVal);
            setMifwidth(mifwidthVal);
            setMifheight(mifheightVal);
        };

        if (infoContent) {
            parseInfoContent();
        }
    }, [infoContent]);

    useEffect(() => {
        const maxZoomLevel = Math.min(scanlens, 100);
        const availableZoomOptions = [1, 2, 5, 10, 20, 40, 60, 80, 100].filter(option => option <= maxZoomLevel);
        setAvailableZoomOptions(availableZoomOptions);
    }, [scanlens]);

    useEffect(() => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(notesContent, 'text/xml');
        const annotations = xmlDoc.getElementsByTagName('Annotation');
        const rows = [];
        for (let index = 0; index < annotations.length; index++) {
            const annotation = annotations[index];
            const color = annotation.getAttribute('Color');
            const metadata = annotation.querySelector('Metadata');
            const name = metadata.getAttribute('Name');
            const description = metadata.getAttribute('Detail');
            const type = annotation.getAttribute('Type');
            const subtype = annotation.getAttribute('Subtype');
            const points = annotation.querySelectorAll('P');
            const x = parseFloat(annotation.getElementsByTagName('P')[0].getAttribute('X'));
            const y = parseFloat(annotation.getElementsByTagName('P')[0].getAttribute('Y'));
            const positions = Array.from(points).map(point => ({
                x: parseFloat(point.getAttribute('X')),
                y: parseFloat(point.getAttribute('Y'))
            }));
            let w = null;
            let h = null;

            const sizeElement = annotation.querySelector('S');
            if (sizeElement) {
                w = parseFloat(sizeElement.getAttribute('W'));
                h = parseFloat(sizeElement.getAttribute('H'));
            }


            rows.push({ color, name, description, x, y, id: (index + 1), w, h, type, subtype, positions });
        }
        SetAnnotationTable(rows);
    }, [notesContent]);


    const handleSlideDirChange = (event) => {
        setSlideDir(event.target.value);
    };

    const handleZoom = (factor) => {
        setZoomLevel(factor);
    };

    const handleVisiblity = () => {
        setAnnotationVisibilty(!annotationVisibility)
    }

    const width = (img_width / scanlens) * zoomLevel;
    const height = (img_height / scanlens) * zoomLevel;


    const renderAnnotations = () => {
        if (!notesContent) return null;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(notesContent, 'text/xml');
        const annotations = xmlDoc.getElementsByTagName('Annotation');

        return Array.from(annotations).map((annotation, index) => {
            const x = parseFloat(annotation.getElementsByTagName('P')[0].getAttribute('X'));
            const y = parseFloat(annotation.getElementsByTagName('P')[0].getAttribute('Y'));
            const detail = annotation.getElementsByTagName('Metadata')[0].getAttribute('Detail');

            const adjustedX = (width / mifwidth) * x;
            const adjustedY = (height / mifheight) * y;

            return (
                <Box key={index} style={{ position: 'absolute', left: adjustedX, top: adjustedY }}>
                    <IconButton>
                        <GiGolfFlag color='red' fontSize={("12px" * zoomLevel)} />
                    </IconButton>
                    <Box fontSize={"12px"} bgcolor="#fff" p="2px" borderRadius="5px" border="2px solid grey">
                        {detail}
                    </Box>
                </Box>
            );
        });
    };

    return (
        <Box display="grid" gap="10px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                border="1px solid grey"
                p={1}
                borderRadius="5px"
            >
                <Box>
                    <FormControl>
                        <InputLabel id="select-label">Select Slide</InputLabel>
                        <Select sx={{ width: "200px" }} labelId="select-label" label="Select Slide" value={slideDir} onChange={handleSlideDirChange}>
                            {slideDirs.map((dir, index) => (
                                <MenuItem key={index} value={dir.value}>{dir.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    display="flex"
                    gap="10px"
                >
                    {availableZoomOptions.map(option => (
                        <IconButton
                            key={option}
                            onClick={() => handleZoom(option)}
                            sx={{ border: "2px solid grey", width: "35px", height: "35px", fontSize: "12px" }}
                        >
                            {`${option}X`}
                        </IconButton>
                    ))}
                </Box>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {isLoading && ( // Render loader if image is loading
                    <Box
                    // position="absolute"
                    // top="50%"
                    // left="50%"
                    // transform="translate(-50%, -50%)"
                    >
                        <CircularProgress />
                    </Box>
                )}

                <Box
                    position="relative"
                    border="1px solid grey"
                    p={1}
                    borderRadius="5px"
                    style={{
                        width: "max-content",
                        overflow: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }} >
                    {annotationVisibility && <Annotations annotations={annotaionTable} width={width} height={height} mifwidth={mifwidth} mifheight={mifheight} zoomLevel={zoomLevel} />}
                    {/* <img id='image' src={imageUrl} width={width} height={height} alt="Full Image" /> */}
                    <img id='image' src={dummy} width={width} height={height} alt="Full Image" />
                </Box>

            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                gap="10px"
            >
                <Button onClick={handleVisiblity} variant="outlined" sx={{ color: "grey", borderColor: "grey" }}>
                    Annotation Visibility
                </Button>

                <Box>
                    {/* {notesContent} */}
                    {notesContent ? (
                        <Annotation_Table rows={annotaionTable} />
                    ) : ""}
                </Box>
            </Box>
            <Box>
                <h2>Info</h2>
                <Box>{infoContent}</Box>
                <p>Scanlens: {scanlens}</p>
                <p>Mifwidth: {mifwidth}</p>
                <p>Mifheight: {mifheight}</p>
            </Box>
        </Box>
    );
}

export default ImageViewer;
