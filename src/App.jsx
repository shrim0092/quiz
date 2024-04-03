import './App.css';
import CardComponent from './Components/CardComponent';

function App() {
  return (
    <div className="App" >
      <CardComponent txt="Solved: 0/4" Htxt="What is the question?" Btxt="Next Question" Bcolor="warning"/>
    </div>
  );
}

export default App;
