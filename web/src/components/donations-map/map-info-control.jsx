import {useLeaflet} from "react-leaflet";
import React, {useEffect} from 'react';

function MapInfoControl({getColor}) {

    const leafletContext = useLeaflet();
    const grades = [95, 75, 50, 30, 25];

    useEffect(() => {
        console.log(leafletContext)
    });

    return (
        <div className="legend">
            {
                grades.map((grade, i) => (
                        <React.Fragment key={i}>
                            <i className="legend-color-box" style={{background: getColor(grades[i])}}/>
                            {
                                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+')
                            }
                        </React.Fragment>
                    )
                )
            }
            )
            }
        </div>
    );
}

export default MapInfoControl;
