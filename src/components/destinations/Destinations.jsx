import React from 'react'
import './DestinationsStyles.css'

import Team from '../../assets/media/team.svg'
import Chepe from '../../assets/media/chepe.svg'
import Letras from '../../assets/media/letras_creel.svg'
import Pareja from '../../assets/media/pareja_barrancas.svg'
import Tarahumara from '../../assets/media/lago_tarahumara.svg'

function Destinations() {
    return (
        <div name='destinations' className='destinations'>
            <div className="container">
                <h1>Los Mejores Lugares de Chihuahua</h1>
                <p></p>
                <div className="img-container">
                    <img className='span-3 image-grid-row-2' src={Team} alt="/"/>
                    <img src={Chepe} alt="/"/>
                    <img src={Letras} alt="/"/>
                    <img src={Pareja} alt="/"/>
                    <img src={Tarahumara} alt="/"/>
                </div>
            </div>
        </div>
    )
}

export default Destinations
