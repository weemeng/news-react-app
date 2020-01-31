import React from "react"

class MapView extends React.Component {
    constructor(props) {
        super(props)
        this.state =  {
            Googlemaps: false,
            NewsData : [],
        }
    }
    render () {
        return (
            <div>
                THis is the newsComponent
            </div>
        )
    }
}

export default MapView;