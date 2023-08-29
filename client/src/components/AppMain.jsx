import React from 'react'
import { divisionCardsJson } from '../data/JsonData'
import { DivisionCards } from './ComponentsIndex'

const AppMain = () => {
  return (
    <React.Fragment>
      <div
        className="container d-flex   flex-column   p-3 "
        style={{ height: '90vh' }}
      >
        <span className="justify-content-center fs-1 text-center ms-5 me-5 mt-5 mb-4">
          Secure Medical Crowd Funding with document verfication using
          Blockchain
        </span>
        <p className="fs-6 text-center p-3 ms-5 me-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ex
          accumsan, condimentum dolor at, porta massa. Aliquam commodo, sem quis
          rhoncus egestas, eros sapien volutpat lectus, ac ornare turpis dui
          vitae mauris. Integer ac mattis eros, a malesuada neque. Sed nibh
          justo, mollis tristique metus id, ullamcorper sodales metus. Ut
          euismod varius placerat. Vivamus rutrum dictum felis. Nulla pharetra
          ipsum sed leo feugiat, sed commodo ligula elementum. Cras sit amet
          turpis congue, mattis ipsum sit amet, venenatis tortor. Aenean mi
          libero, fringilla id consectetur sit amet, tincidunt sed dui. Cras
          efficitur hendrerit ligula, sit amet vulputate metus commodo sed.
          Nulla tincidunt tortor venenatis, ullamcorper mi vel, sodales dolor.
          Fusce nec justo at leo blandit ullamcorper at vitae nunc. Fusce eu
          risus id mi interdum hendrerit. Maecenas laoreet congue imperdiet.
          Nullam id maximus felis.
        </p>

        <div className="d-flex gap-3 ms-5 me-5 p-3">
          {divisionCardsJson.map((key, ind) => (
            <DivisionCards
              key={ind}
              cardHeader={key.cardHeader}
              cardTitle={key.cardTitle}
              cardDes={key.cardDes}
              link={key.link}
              cardFooter={key.cardFooter}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AppMain
