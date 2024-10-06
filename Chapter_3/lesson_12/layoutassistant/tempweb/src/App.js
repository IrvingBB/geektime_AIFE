import './App.css';
import Opbar from './components/Opbar'
import Seckill from './components/Seckill'
import Banner from './components/Banner'
import Item from './components/Item'

function App() {
  return (
    <div className="App">

      <Opbar position={{ "left": 1.5, "top": 11.5, "width": 345, "height": 39 }} />
      <Seckill position={{ "left": 1.5, "top": 337.5, "width": 345, "height": 129 }} />
      <Banner position={{ "left": 3, "top": 80, "width": 340, "height": 124 }} />
      <Item position={{ "left": 3.5, "top": 469.5, "width": 343, "height": 147 }} type={Math.floor(Math.random()*3)}/>
      <Item position={{ "left": 3.5, "top": 210.5, "width": 341, "height": 121 }} type={Math.floor(Math.random()*3)} />
      <Item position={{ "left": -0.5, "top": 614.5, "width": 347, "height": 119 }} type={Math.floor(Math.random()*3)} />


    </div>
  );
}

export default App;

