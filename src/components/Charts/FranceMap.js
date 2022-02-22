import React, {  useState, useEffect } from 'react'
import France from "@svg-maps/france.regions";
import { SVGMap } from "react-svg-map";

import FranceDep from "@svg-maps/france.departments";

export const FranceMap = ({ dataAds, dataSpent,limits, colors }) => {
	const [locationClassName, setLocationClassName] = useState({})
	const [dataLocation, setDataLocation] = useState({
		    ara: '',
			bfc: '',
			bre: '',
			cvl: '',
			cor: '',
			ges: '',
			hdf: '',
			idf: '',
			nor: '',
			naq: '',
			occ: '',
			pdl: '',
			pac: ''
	})
	const [spentLocation, setSpentLocation] = useState({
		ara: '',
		bfc: '',
		bre: '',
		cvl: '',
		cor: '',
		ges: '',
		hdf: '',
		idf: '',
		nor: '',
		naq: '',
		occ: '',
		pdl: '',
		pac: ''
})
	const [pointedLocation,setPointedLocation]= useState(null)
	const [pointedDataLocation, setPointedDataLocation] = useState(null)
	const [pointedSpent,setPointedSpent]= useState(null)

	const [tooltipStyle,setTooltipStyle]= useState({
		display: 'none'

	})

	useEffect(() => {
		
		var result = dataAds.reduce(function(map, obj) {
			map[obj.region] =  parseInt(obj.number_of_ads) ;
			return map;
		}, {});
		
		var resultt = dataSpent.reduce(function(map, obj) {
			map[obj.region] = parseInt(obj.mean_spend) ;
			return map;
		}, {});
		setDataLocation({
			ara: result["Auvergne"] + result["Rhône-Alpes"],
			bfc: result["Bourgogne"] + result["Franche-Comté"],
			bre: result["Bretagne"],
			cvl: result["Centre"],
			cor: result["Corse"],
			ges: result["Alsace"]+ result["Lorraine"]+result["Champagne-Ardenne"],
			hdf: result["Picardie"] + result["Nord-Pas-de-Calais"],
			idf: result["Île-de-France"],
			nor: result["Haute-Normandie"] + result["Basse-Normandie"],
			naq: result["Limousin"]+result["Aquitaine"]+result["Poitou-Charentes"],
			occ: result["Midi-Pyrénées"] + result["Languedoc-Roussillon"],
			pdl: result["Pays de la Loire"],
			pac: result["Provence-Alpes-Côte d'Azur"]
		})

		setSpentLocation({
			ara: resultt["Auvergne"]  + resultt["Rhône-Alpes"],
			bfc: resultt["Bourgogne"] + resultt["Franche-Comté"],
			bre: resultt["Bretagne"],
			cvl: resultt["Centre"],
			cor: resultt["Corse"],
			ges: resultt["Alsace"]+ resultt["Lorraine"]+resultt["Champagne-Ardenne"],
			hdf: resultt["Picardie"] + resultt["Nord-Pas-de-Calais"],
			idf: resultt["Île-de-France"],
			nor: resultt["Haute-Normandie"] + resultt["Basse-Normandie"],
			naq: resultt["Limousin"]+resultt["Aquitaine"]+resultt["Poitou-Charentes"],
			occ: resultt["Midi-Pyrénées"] + resultt["Languedoc-Roussillon"],
			pdl: resultt["Pays de la Loire"],
			pac: resultt["Provence-Alpes-Côte d'Azur"]
		})

		


	}, [])
	
	/*const getLocationName = (event) => {
		return event.target.attributes.name.value;
        
	}
    const getLocationId = (event) => {
		return event.target.id
	}
*/
    const handleLocationMouseOver= (event) =>  {
		const pointedLocationId =  event.target.id
		setPointedLocation(event.target.attributes.name.value)
		setPointedDataLocation(dataLocation[pointedLocationId])
		setPointedSpent(spentLocation[pointedLocationId])

	}
    
	const handleLocationMouseOut = ()  => {
		setPointedLocation(null)
		setPointedSpent(null)
		setTooltipStyle({display: 'none'})
	}

	const handleLocationMouseMove = (event) =>  {
		setTooltipStyle({
			display: 'block',
			top: event.clientY + 10,
			left: event.clientX - 100
		})
	}
	const getLocationClassName = (location, index) => {
		// Generate random heat map
		console.log(spentLocation[location.id])
		let i 
		if(spentLocation[location.id]>3000000) {
			 i = 3
		}
		else{
			if (spentLocation[location.id]>2000000 && spentLocation[location.id]<3000000 ) {
				 i = 2
			}
			else{
				if (spentLocation[location.id]>1000000 && spentLocation[location.id]<2000000 ) {
					 i = 1
				}
				else{
					i=0
				}
			}
		}
		return `svg-map__location--int${i}`;
	}

        return (
			
          <div className="franceMap">
            <SVGMap 
			map={France} 
			locationClassName = {getLocationClassName}
            onLocationMouseOver={handleLocationMouseOver}
            onLocationMouseOut={handleLocationMouseOut}
            onLocationMouseMove={handleLocationMouseMove} 
			limits={limits}
			colors={colors}
            />
         <div className="legendeMap">
		 <table>
        <tbody>

			<tr>
				<td style={{background:"#d7dff0"}}>&gt;
				</td>
			</tr>

			<tr>
				<td style={{background:"#bbc6da"}} >1000000
				</td>
			</tr>

			<tr>
				<td style={{background:"#92a0bc"}}>2000000
				</td>
			</tr>

		<tr>
				<td style={{background:"#728bbc"}}>3000000
				</td>
			</tr>

		</tbody>
		</table>
		 </div>
			
            <div className="mapTooltip" style={tooltipStyle}>
               
				<p style={{color:"black", fontSize:"12px", fontFamily:"Gotham", fontWeight:"bold"}}> {pointedLocation } {pointedDataLocation != undefined && pointedDataLocation != "NaN" ?": " + pointedDataLocation + " ads":"" }</p>
			
				{pointedSpent != undefined && pointedSpent != NaN ? <h6>{pointedSpent} €</h6>: "" }
			  </div>
        </div>
        )
    
}

export default FranceMap
