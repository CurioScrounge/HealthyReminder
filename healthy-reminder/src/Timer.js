import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css'
import PlayTimer from './PlayTimer';
import PauseTimer from './PauseTimer';


function Timer(){
    const value = 0;
    return(
        <div>
        <div className='timer'>
            <CircularProgressbar 
            value={value} 
            maxValue={1} 
            text={`${value * 100}%`} 
            strokeWidth={5}
            styles={buildStyles({
                pathColor:'#A28B55',
                trailColor:'#CBE2B5',
                textColor:'#E7FBE6'
            })} />
            <PlayTimer />
            <PauseTimer />
        </div>
        </div>
    );
}

export default Timer;