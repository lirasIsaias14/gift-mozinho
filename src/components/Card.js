import React from 'react';
import '../assets/css/card.css';
import musics from '../assets/data'

const Card = ({props: {musicNumber, setMusicNumber }}) => {
  
  return (
    <div className='card'>
        <div className='nav'>
            <i className="material-symbols-outlined">keyboard_arrow_down</i>
            <span>Now Playing {musicNumber + 1}/{musics.length}</span>
            <i className="material-symbols-outlined">queue_music</i>
        </div>

        <div className='img'>
            <div className='hope'></div>
            <img src={musics[musicNumber].thumbnail} alt='Thumbnail'/>
        </div>

        <div className='details'>
            <p className='title'>{musics[musicNumber].title}</p>
            <p className='artist'>{musics[musicNumber].artist}</p>
        </div>
        
        <div className='progress'>
            <input type='range' min={0} max={100}/></div>

        <div className='timer'>
            <span>00:00</span>
            <span>04:44</span>
        </div>

        <div className='controls'>
            <i className='material-symbols-outlined'>repeat</i>
            <i className="material-symbols-outlined" id='prev'>arrow_back_ios</i>
            <div className='play'>
            <i className="material-symbols-outlined">play_arrow</i>
            </div>  
            <i className="material-symbols-outlined" id='next'>arrow_forward_ios</i>
            <i className="material-symbols-outlined">volume_up</i>
            <div className='volume show'>
                <i className="material-symbols-outlined">volume_up</i>
                <input type='range' min={0} max={100}/>
                <span>50</span>
            </div>
        </div>
        

    </div>
  )
}

export default Card;