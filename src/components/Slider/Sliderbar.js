import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./SliderbarComponent"; // example render components - source below
import { subDays, startOfToday, format } from "date-fns";
import { scaleTime } from "d3-scale";
import "./Sliderbar.css";

const sliderStyle = {
  position: "relative",
  width: "100%"
};

function formatTick(ms) {
  return format(new Date(ms), "MMM dd");
}

const halfHour = 1000 * 60 * 30;

class Sliderbar extends Component {
  constructor() {
    super();
    //Initialised Values
    const date_today = startOfToday();
    const date_init = subDays(date_today, 4);
    const date_earliest = subDays(date_today, 7);

    this.state = {
      selected: date_init,
      updated: date_init,
      min: date_earliest,
      max: date_today
    };
  }

  onChange = ([ms]) => {
    this.setState({
      selected: new Date(ms)
    });
  };

  onUpdate = ([ms]) => {
    this.setState({
      updated: new Date(ms)
    });
  };

  onAvailableData = () => {
    //catcher
    if (!this.props) {
      return;
    }
    //update if earliest and latest
    const MS_TO_DAYS = 1 / 1000 / 3600 / 24;
    const { earliest, latest } = this.props;
    console.log(earliest, latest);
    if (latest - earliest < 10) {
      return;
    } else {
      const dateDiff = Math.ceil((latest - earliest) * MS_TO_DAYS);
      const date_earliest = subDays(this.state.max, dateDiff);
      this.setState({
        min: date_earliest
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.earliest - this.props.earliest !== 0) {
      this.onAvailableData();
    }
    const HALF_HOUR_IN_MS = 1000 * 1800;
    const isTriggered =
      Math.abs(prevState.updated - this.state.updated) / HALF_HOUR_IN_MS >= 1;
    if (isTriggered) {
      this.sendData();
    }
  }

  sendData = () => {
    this.props.sliderCallback(this.state.updated);
  };

  renderDateTime(date, header) {
    return (
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontFamily: "Arial",
          margin: 5
        }}
      >
        <b>{header}:</b>
        <div style={{ fontSize: 12 }}>{format(date, "MMM dd h:mm a")}</div>
      </div>
    );
  }

  render() {
    const { min, max, selected } = this.state;

    const dateTicks = scaleTime()
      .domain([min, max])
      .ticks(8)
      .map(d => +d);

    return (
      <div className="Slider">
        <div className="Slider__inner">
          <Slider
            mode={1}
            step={halfHour}
            domain={[+min, +max]}
            rootStyle={sliderStyle}
            onUpdate={this.onUpdate}
            onChange={this.onChange}
            values={[+selected]}
          >
            <Rail>
              {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div>
                  {handles.map(handle => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={[+min, +max]}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks right={false}>
              {({ tracks, getTrackProps }) => (
                <div>
                  {tracks.map(({ id, source, target }) => (
                    <Track
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </div>
              )}
            </Tracks>
            <Ticks values={dateTicks}>
              {({ ticks }) => (
                <div>
                  {ticks.map(tick => (
                    <Tick
                      key={tick.id}
                      tick={tick}
                      count={ticks.length}
                      format={formatTick}
                    />
                  ))}
                </div>
              )}
            </Ticks>
          </Slider>
        </div>
      </div>
    );
  }
}

export default Sliderbar;
