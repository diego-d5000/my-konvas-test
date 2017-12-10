import React, { Component } from 'react';
import './App.css';
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';

class ColoredRect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      image: null,
      boxColor: "green"
    }

    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = '/gymmachine.png';
    image.onload = () => {
      this.setState({
        image: image
      });
    }
  }

  handleDragEnd() {
    const machine = this.refs.machine.attrs;
    const terrain = this.refs.terrain.attrs;

    const machineCornerA = [machine.y, machine.x];
    const machineCornerB = [machine.y + machine.height, machine.x];
    const machineCornerC = [machine.y + machine.height, machine.x + machine.width];
    const machineCornerD = [machine.y, machine.x + machine.width];
    const machineCorners = [machineCornerA, machineCornerB, machineCornerC, machineCornerD];

    const terrainCornerA = [terrain.y, terrain.x];
    const terrainCornerB = [terrain.y + terrain.height, terrain.x + terrain.width];

    var isInnerTerrain = machineCorners
      .map(machineCorner => (machineCorner[0] > terrainCornerA[0] && machineCorner[0] < terrainCornerB[0])
        && (machineCorner[1] > terrainCornerA[1] && machineCorner[1] < terrainCornerB[1]))
      .reduce((prev, curr) => prev && curr, true)

    this.setState({boxColor: isInnerTerrain ? "green" : "red"})
  }

  render() {
    return ([
      <Rect
        ref="terrain"
        x={window.innerWidth / 2 - 200}
        y={window.innerHeight / 2 - 200}
        width={400}
        height={400}
        fill="#eee"
        stroke="black"
        strokeWidth={3}
      />
      ,
      <Image
        ref="machine"
        width={50}
        height={50}
        draggable={true}
        image={this.state.image}
        onDragEnd={this.handleDragEnd}
      />
      ,
      <Rect
        x={50}
        y={50}
        width={20}
        height={20}
        fill={this.state.boxColor}
        stroke="black"
        strokeWidth={1}
      />
    ]);
  }
}

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Playground" />
          <ColoredRect />
        </Layer>
      </Stage>
    );
  }
}

export default App;
