import React from 'react'
import { Table } from "reactstrap";
import { useIntl } from 'react-intl';

function Summary({data}) { 
    const intl = useIntl();

    return (
        
                <Table className="summary" borderless="true">
                    <tbody>
                       
                        <tr>
                            <th > {intl.formatMessage({ id: 'dashboardSubTitle1' })} </th>
                            <th >  {intl.formatMessage({ id: 'dashboardSubTitle2' })}</th>
                            <th >  {intl.formatMessage({ id: 'dashboardSubTitle3' })}</th>
                            <th >  {intl.formatMessage({ id: 'dashboardSubTitle4' })}</th>
                            <th> {intl.formatMessage({ id: 'dashboardSubTitle5' })}</th>

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
