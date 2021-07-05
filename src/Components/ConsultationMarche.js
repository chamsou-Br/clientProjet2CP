import React from 'react'

function ConsultationMarche(props) {

    const Dossier = props.Dossier;

    return (
        <> 
                  <div className="table-responsive service">
                     
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                       
                            <thead>
                                <tr style={{color : '#1a1a2e'}}>
                                    <th>Service Marche</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody  style={{color : '#1a1a2e' , fontWeight : '600'}}>
                                <tr  >
                                    <td>objet</td>
                                    <td>{Dossier.marche.objet ? (<span>{Dossier.marche.objet}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date de lanecement </td>
                                    <td>{Dossier.marche.date_lancement ? (<span>{Dossier.marche.date_lancement}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date d'ouverture </td>
                                    <td>{Dossier.marche.data_ouverture ? (<span>{Dossier.marche.data_ouverture}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date de transmission au service commande : </td>
                                    <td>{Dossier.marche.data_transm ? (<span>{Dossier.marche.data_transm}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>N° Convention </td>
                                    <td> {Dossier.marche.num_convention ? (<span>{Dossier.marche.num_convention}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Duré de traitement du dossie </td>
                                    <td> {Dossier.marche.duree_trait ? (<span>{Dossier.marche.duree_trait}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date d'envoi au service commande</td>
                                    <td>{Dossier.marche.data_transm ? (<span>{Dossier.marche.data_transm}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Observation</td>
                                    <td>{Dossier.marche.observation ? (<span>{Dossier.marche.observation}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                 
        </>
    )
}

export default ConsultationMarche
