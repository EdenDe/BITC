import React, { Component } from 'react'


export default class ContactFilter extends Component {
    
  state = {
      filterBy: ''
  }

  componentDidMount() {
      this.setState({ filterBy: this.props.filterBy })
  }

  handleChange = ({ target }) => {
      this.setState(
          ({ filterBy: target.value }),
          () => this.props.onChangeFilter(this.state.filterBy)
      )
  }

  render() {
    const input = this.state.filterBy

    return (
      <section className="contact-filter">
          <input onChange={this.handleChange} value={input} type="text" placeholder='Search'/>
      </section>
    )
  }
}
