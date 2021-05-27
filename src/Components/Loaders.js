import React from 'react'
import {motion ,useCycle} from 'framer-motion'

const VariantLoaders = {
    visible1 : {
        x : [-80 ,80],
        y : [70 , -70],
        transition : {
            x : {
                duration : 0.7 ,
                yoyo : Infinity
            },
            y : {
                duration : 0.35 ,
                ease : 'easeOut',
                yoyo : Infinity
            }
        }
    },
    visible2 : {
        y : [20 , -20 ],
        x : 0,
        transition : {
            y : {
                duration : 0.25 ,
                yoyo : Infinity,
                ease : 'easeOut'
            }
        }
    }
}


const Loaders = () => {

    const [Visible , cycleVisible] = useCycle('visible1' , 'visible2')
    return(

    <div className="loaderpere">
        <motion.div
         variants={VariantLoaders}
         animate={Visible}
         className='loader'>

        </motion.div>
        <br />
        <br />
        <br />
        <div className='loding_Title'>Loading ...</div>
    </div>
    )
}
export default Loaders