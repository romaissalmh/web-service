import React from 'react'
import { Table } from "reactstrap";

function Summary({data}) { 
    return (
        
                <Table className="summary" borderless="true">
                    <tbody>
                       
                        <tr>
                            <th >Number of pages </th>
                            <th >Lower boundary of impressions </th>
                            <th >Upper boundary of impressions </th>
                            <th >Lower boundary of spending </th>
                            <th>Upper boundary of spending </th>

                        </tr>
                      
                       {
                           
                           data.lower_bound_impressions !== undefined ? 
                           <tr>
                           <td> {data.numberPages.toLocaleString("en-US")} </td>
                            <td> {parseInt(data.lower_bound_impressions).toLocaleString("en-US")} </td>
                            <td> {parseInt(data.upper_bound_impressions).toLocaleString("en-US")}  </td>
                            <td> {parseInt(data.lower_bound_spend).toLocaleString("en-US")}  €</td>
                            <td> {parseInt(data.upper_bound_spend).toLocaleString("en-US")}  €</td>


                        </tr>
                           : ""
                       }

                    </tbody>
                </Table>
        
    )
}

export default Summary
