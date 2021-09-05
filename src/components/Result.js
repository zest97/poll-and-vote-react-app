import React, { Component } from 'react'

class Result extends Component {
    getPercentage(voteCount, total) {
        let percentage = (voteCount * 100) / total
        let percentageNumber = Math.round(percentage);
        return `${percentageNumber}%`
    }
    render() {
        const { option, total, voted } = this.props
        return (
            <div className='card result mb-2'>
                <div className={voted ? 'card-body py-2 voted' : 'card-body py-2'}>
                    {voted && <div className='voted-box'>Your Vote</div>}
                    <p className='fw-bold title'>{ option.text }</p>
                    <div className="progress">
                        <div 
                            className="progress-bar progress-gradiant-bg" role="progressbar" 
                            style={{width: this.getPercentage(option.votes.length, total)}} 
                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            {this.getPercentage(option.votes.length, total)}
                        </div>
                    </div>
                    <p className='text-center fw-bold mb-0 text-muted description'>{option.votes.length} out of {total} votes</p>
                </div>
            </div>
        )
    }
}

export default Result