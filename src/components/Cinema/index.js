import React from 'react';

import './style.css';

export default function Cinema(props) {
    const {cinema} = props;
    return (
        <div className="cinema clearfix">
            <div className="leftside">
                <div className="name">
                    {(cinema.attributes.shortTitle === '' || !cinema.attributes.shortTitle) ? cinema.attributes.title : cinema.attributes.shortTitle}
                </div>

                <div className="address">
                    {(cinema.attributes.mall === '' || !cinema.attributes.mall) ? cinema.attributes.address : cinema.attributes.mall}
                </div>

                {cinema.attributes.subway.map(station => <div className="station" key={station.id}>
                    <div className="station-color" style={{borderColor: `#${station.color}`}}></div>
                    {station.name}
                </div>)}

            </div>

            <div className="rightside">
                {cinema.attributes.labels.map(label => {
                    if (label.type === 'text') {
                        return <div className="have-tickets" key={label.text}>
                            {label.text}
                        </div>
                    }
                })}

                <a href="" className="add-to-favorite" onClick={e => e.preventDefault()}>
                    +
                </a>
            </div>
        </div>
    )
}