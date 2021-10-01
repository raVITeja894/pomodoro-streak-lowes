import React, { Component } from "react";
import TypeSelect from "../components/TypeSelect";
import TimeDisplay from "../components/TimeDisplay";
import Controls from "../components/Controls";
import TaskList from "../components/Tasks/TaskList";
import "./Pomodoro.css";

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: props.types[0],
      time: props.types[0].time,
      interval: null,
      running: false,

      taskStatus:
        JSON.parse(window.localStorage.getItem("pomodoro-react-taskStatus")) ||
        null,
    };
  }

  static defaultProps = {
    types: [
      { name: "Pomodoro", time: 1500 },
      { name: "Short Break", time: 300 },
    ],
  };

  changeType = (type) => {
    this.resetTimer();
    this.setState({ selectedType: type, time: type.time, running: false });
  };

  tick = () => {
    if (this.state.time <= 1) {
      this.stopInterval();
      this.setState({ running: false });
    }
    this.setState((state) => ({ time: state.time - 1 }));
  };

  stopInterval = () => {
    clearInterval(this.state.interval);
    this.setState({ interval: null });
  };

  startTimer = () => {
    this.setState((state) => ({
      running: true,
      interval: setInterval(this.tick, 1000),
      time: state.time > 0 ? state.time : state.selectedType.time,
    }));
  };

  resetTimer = () => {
    this.stopInterval();
    this.setState((state) => ({
      time: state.selectedType.time,
      running: false,
    }));
  };

  pauseTimer = () => {
    this.state.interval ? this.stopInterval() : this.startTimer();
  };

  getStatus = () => {
    const { time, running, interval } = this.state;
    if (time === 0) return "Finished";
    if (running && !interval) return "Paused";
    if (running) return "Running";
  };

  getProgress = () => {
    const current = this.state.time;
    const total = this.state.selectedType.time;
    return ((total - current) / total) * 100;
  };

  render() {
    const { time, selectedType } = this.state;
    const { types } = this.props;

    return (
      <div className="Content">
        <div className="Pomodoro">
          <TypeSelect
            types={types}
            selected={selectedType}
            changeType={this.changeType}
          />
          <TimeDisplay
            time={time}
            status={this.getStatus()}
            progress={this.getProgress()}
          />
          <Controls
            start={this.startTimer}
            reset={this.resetTimer}
            pause={this.pauseTimer}
            status={this.getStatus()}
          />
        </div>

        <div className="TaskPainel">
          <TaskList />
        </div>
      </div>
    );
  }
}

export default Pomodoro;
