import React, {useState, useEffect, useRef} from 'react';
import '../assets/css/card.css';
import musics from '../assets/data'
import { timer } from '../utils/timer.js';
import { visualizer } from '../utils/visualizer.js';

const Card = ({props: {musicNumber, setMusicNumber, setOpen }}) => {
    const [duration, setDuration] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlary] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [volume, setVolume] = useState(50);
    const [repeat, setRepeat] = useState('repeat');

    const audioRef = useRef();
    const canvaRef = useRef();
    
    function handleLoadStart(e){
        setDuration( audioRef.current.duration);
        if(play){ audioRef.current.play();}
        }


    function handlePlayingAudio(){
        visualizer(audioRef.current, canvaRef.current, play);
        if(play){
            audioRef.current.pause();
            setPlary(false);
        }else {
            audioRef.current.play();
            setPlary(true);
        }
    }

    function handleTimeUpdate(){
        const currentTime = audioRef.current.currentTime;
        setCurrentTime(currentTime);
    }

    function changeCurrentTime(e){
        const currentTime = Number(e.target.value);
        audioRef.current.currentTime = currentTime;
        setCurrentTime(currentTime);
    }

    function handleNextPrev(n){
        setMusicNumber(value => {
            if(n > 0)
                return value + n > musics.length - 1 ? 0 : value + n;
            return value + n < 0 ? musics.length - 1 : value + n;
            
        })
    }

    function hendleRepeat(){
        setRepeat(value => {
            switch(value){

                case 'repeat':
                  return  'repeat_one';
                case 'repeat_one':
                  return 'shuffle';

                default:
                  return 'repeat';
                
            }
    })}

    function EndedAudio(){
        switch(repeat) {
            case 'repeat_one':
                return audioRef.current.play();

            case 'shuffle':
                return handleShuffle();

            default:
                return  handleNextPrev(1);


        }
    }

    function handleShuffle(){
        let random = Math.floor(Math.random() * (musics.length - 1));
        if (random === musicNumber){
            random = random + 1  > musics.length - 1 ? 0 : random + 1;
        }
        setMusicNumber(random);
    }

    useEffect(() => {
        audioRef.current.volume = volume / 100;
    }, [volume]);


  return (
    <div className='card'>
        <div className='nav'>

            <i className="material-symbols-outlined">keyboard_arrow_down</i>

            <span>Now Playing {musicNumber + 1}/{musics.length}</span>

            <i className="material-symbols-outlined"
            onClick={() => setOpen(prev => !prev)}>queue_music</i>

        </div>

        <div className='img'>
            <div className='hope'></div>
            <img src={musics[musicNumber].thumbnail} alt='Thumbnail'
            className={`${play ? 'playing' : ''}`}/>
            <canvas ref={canvaRef} />
        </div>

        <div className='details'>
            <p className='title'>{musics[musicNumber].title}</p>
            <p className='artist'>{musics[musicNumber].artist}</p>
        </div>
        
        <div className='progress'>
            <input type='range' min={0} max={duration}
            value={currentTime} onChange={e => changeCurrentTime(e)}
            style={{
                background: `linear-gradient(to right, #3cff0079 0%, #15ff00ff ${(currentTime / duration) * 100}%, #777 ${(currentTime / duration) * 100}%, #777 100%)`
            }}/>
        </div>

        <div className='timer'>
            <span>{timer(currentTime)}</span>
            <span>{timer(duration)}</span>
        </div>

        <div className='controls'>
            <i className='material-symbols-outlined'
            onClick={hendleRepeat}>{repeat}</i>

            <i className="material-symbols-outlined" id='prev'
            onClick={() => handleNextPrev(-1)}>arrow_back_ios</i>

            <div className='play' onClick={handlePlayingAudio}>
            <i className="material-symbols-outlined"
            >{play ? 'pause' : 'play_arrow'}</i>
            </div>  

            <i className="material-symbols-outlined" id='next'
            onClick={() => handleNextPrev(1)}>arrow_forward_ios</i>

            <i className="material-symbols-outlined"
            onClick={() => setShowVolume(prev => !prev )}>volume_up</i>
            
            <div className={`volume ${showVolume ? 'show' : ''}`}>
                <i className="material-symbols-outlined"
                onClick={() => setVolume(v => v > 0 ? 0 : 100)}>
                    {volume === 0 ? 'volume_off' : 'volume_up'}
                    </i>

                <input type='range' min={0} max={100} value={volume}
                onChange={e => setVolume(Number(e.target.value))}/>

                <span>{volume}</span>
            </div>
        </div>
        
        <audio src={musics[musicNumber].src} hidden ref={audioRef} 
        onLoadedData={handleLoadStart} onTimeUpdate={handleTimeUpdate}
        onEnded={EndedAudio}/>

    </div>
  )
}


export default Card;