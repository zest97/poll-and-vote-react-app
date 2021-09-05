import React, { Component } from 'react'
import Poll from './Poll'
import PropType from 'prop-types'

class ListOfPoll extends Component {
    state = {
        current: 1,
        perPage: 2
    }
    changePage = (e) => {
        e.preventDefault()

        const pageNum = Number(e.target.textContent)

        this.setState(() => ({
            current: pageNum
        }))
    }
    goNextPage = (e) => {
        e.preventDefault()
        this.setState((prevState) => ({
            current: prevState.current + 1
        }))
    }
    goPrevPage = (e) => {
        e.preventDefault()
        this.setState((prevState) => ({
            current: prevState.current - 1
        }))
    }
    render() {
        const { polls } = this.props
        let pages = 1
        if ( polls.length > this.state.perPage ) {
            pages = Math.round(polls.length / this.state.perPage)
        }
        const startIndex = (this.state.current * this.state.perPage) - this.state.perPage
        const endIndex = startIndex + this.state.perPage
        return (
            <div className='p-3'>
                {polls.slice(startIndex, endIndex).map((pollId) => (
                    <Poll id={pollId} key={pollId} />
                ))}
                {(pages > 1) && (
                <nav>
                    <ul className="pagination justify-content-end mb-0">
                        <li className={this.state.current === 1 ? 'page-item disabled': 'page-item'}>
                            <a 
                                onClick={this.goPrevPage}
                                className='page-link'
                                href="/#/" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {[...Array(pages)].map((e, i) => {
                            const pageNumber = i + 1;
                            return (
                                <li 
                                    onClick={this.changePage}
                                    className={pageNumber === this.state.current ? 'page-item active' : 'page-item'} 
                                    key={`Page_Number_${i}`}>
                                    <a className="page-link" href="/#/">{pageNumber}</a>
                                </li>
                            )
                        })}
                        <li className={this.state.current === pages ? 'page-item disabled': 'page-item'}>
                            <a 
                                onClick={this.goNextPage}
                                className='page-link'
                                href="/#/" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                )}
           </div>
        )
    }
}

ListOfPoll.propTypes = {
    polls: PropType.array.isRequired
}

export default ListOfPoll