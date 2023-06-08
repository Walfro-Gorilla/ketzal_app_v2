import React from 'react'
import './SelectsStyles.css'

import BoraBora from '../../assets/media/borabora.jpg'
import BoraBora2 from '../../assets/media/borabora2.jpg'
import Maldives from '../../assets/media/maldives.jpg'
import Maldives2 from '../../assets/media/maldives2.jpg'
import Maldives3 from '../../assets/media/maldives3.jpg'
import KeyWest from '../../assets/media/keywest.jpg'

import SelectsImg from '../SelectsImg/SelectsImg'


function Selects() {
    return (
        <div name='views' className='selects'>
            <div className='container'>
                <SelectsImg bgImg={BoraBora} text='Bora Bora' />
                <SelectsImg bgImg={BoraBora2} text='Emerald Bay' />
                <SelectsImg bgImg={Maldives} text='Maldives' />
                <SelectsImg bgImg={Maldives2} text='Grenada' />
                <SelectsImg bgImg={Maldives3} text='Barbados' />
                <SelectsImg bgImg={KeyWest} text='Key West' />
            </div>

        </div>
    )
}

export default Selects
