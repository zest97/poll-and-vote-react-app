import React, { Component } from 'react'
import PropType from 'prop-types'

class Score extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card-header text-center'>
                    Score
                </div>
                <div className='class-body'>
                    <div className='score-result text-white fw-bold text-center'>
                        {this.props.point}
                    </div>
                </div>
            </div>
        )
    }
}

Score.propTypes = {
    point: PropType.number.isRequired
}

export default Score