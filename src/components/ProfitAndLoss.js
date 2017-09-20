import React, { Component } from 'react'
import './styles/ProfitAndLoss.css'
import TableColumn from './TableColumn'
import SimpleLineChart from './SimpleLineChart'
import moment from 'moment'
import {getKey} from '../helper'

class ProfitAndLoss extends Component {
  constructor() {
    super()
    this.state = {
      measurements: [],
      firstLine: 'sales',
      secondLine: 'discount'
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    fetch('http://warm-beyond-47329.herokuapp.com/api/v1/profit_and_loss')
    .then(response => {
      return response.json()
    })
    .then(data => {
      const measurements = data.map(d => {
        d.date = moment(d.date).format("MMM YY")
        d.sales = +(d.sales)
        d.discount = +(-d.discount)
        d.net_sales = +(d.net_sales)
        d.cogs = +(-d.cogs)
        d.gross_profit = +(d.gross_profit)
        d.op_expense = +(-d.op_expense)
        d.net_profit = +(d.net_profit)
        return d
      })
      this.setState({ measurements })
    })
    .catch(error => {
      console.error(error)
    })
  }

  render() {
    const column_data = this.state.measurements.map(a => {
      return <TableColumn key={getKey()} data={a}/>
    })
    return (
      <div className='profit'>
        <h1>Profit And Loss Statement</h1>
        <SimpleLineChart measurements={this.state.measurements} firstLine={this.state.firstLine} secondLine={this.state.secondLine}/>
        <div className='graph-selection'>
          <p>Compare measurements: </p>
          <select value={this.state.firstLine} name="firstLine" onChange={this.handleOnChange}>
            <option value="sales">Sales</option>
            <option value="discount">Discount</option>
            <option value="net_sales">Net Sales</option>
            <option value="cogs">Cost of Goods Sold</option>
            <option value="gross_profit">Gross Profit</option>
            <option value="op_expense">Operating Expense</option>
            <option value="net_profit">Net Profit</option>
          </select>
          <select value={this.state.secondLine} name="secondLine" onChange={this.handleOnChange}>
            <option value="sales">Sales</option>
            <option value="discount">Discount</option>
            <option value="net_sales">Net Sales</option>
            <option value="cogs">Cost of Goods Sold</option>
            <option value="gross_profit">Gross Profit</option>
            <option value="op_expense">Operating Expense</option>
            <option value="net_profit">Net Profit</option>
          </select>
        </div>
        <section className='data-table'>
        <section className='data-column'>
          <articles className='data-header'>Month</articles>
          <articles className='data-header'>Sales</articles>
          <articles className='data-header'>Discounts</articles>
          <articles className='data-header'>Net Sales</articles>
          <articles className='data-header'>COGS</articles>
          <articles className='data-header'>Gross Profit</articles>
          <articles className='data-header'>Operating Expense</articles>
          <articles className='data-header'>Net Profit</articles>
        </section>
          <section className='data-list'>
            {column_data}
          </section>
        </section>
        <section>

        </section>
      </div>
    )
  }
}

export default ProfitAndLoss