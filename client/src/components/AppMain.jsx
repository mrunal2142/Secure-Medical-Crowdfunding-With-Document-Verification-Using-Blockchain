import React from 'react'
import { divisionCardsJson } from '../data/JsonData'
import { DivisionCards } from './ComponentsIndex'

const AppMain = () => {
  return (
    <React.Fragment>
      <div
        className="container d-flex   flex-column   p-3 "
        style={{
          height: '90vh',

          textAlign: 'justify',
          textJustify: 'inter-word',
        }}
      >
        <span className="justify-content-center fs-1 text-center ms-5 me-5 mt-5 mb-4">
          Secure Medical Crowd Funding with document verfication using
          Blockchain
        </span>
        <p className="fs-6 p-3 ms-5 me-5">
          Medical crowdfunding has emerged as a paramount means of financial
          support for individuals facing healthcare-induced financial issues.
          However, most of the existing platforms have problems related to
          security, transparency, and fraudulent information for funding. The
          proposed solution leverages blockchain technology and its key factors
          to tackle these issues, curating a secure and efficient platform for
          crowdfunding. The proposed system integrates blockchain key features
          like immutability & transparency to ensure the virtue of medical
          funding campaigns along with document verification, ensuring funds for
          genuine cases and minimizing fraudulent cases. Integration of
          blockchain offers a robust solution with enhanced security,
          transparency & trust of potential donors.
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
