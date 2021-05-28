import React from 'react'

function ConsultationCompatibilite(props) {

    const Dossier = props.Dossier;

    return (
        <>
                <h1 className='titleTable'>Service Compatibilité</h1>   
                <div className="table-responsive service">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Objet</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Date de réception</td>
                                    <td>{Dossier.comptable.date_reception ? (<span>{Dossier.comptable.date_reception}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Pieces a completer</td>
                                    <td>{Dossier.comptable.piece_cmpleter ? (<span>{Dossier.comptable.piece_cmpleter}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date de complément du dossier</td>
                                    <td>{Dossier.comptable.date_cmplement ? (<span>{Dossier.comptable.date_cmplement}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date de peiment</td>
                                    <td>{Dossier.comptable.date_paiement ? (<span>{Dossier.comptable.date_paiement}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Duré de traitement du dossie</td>
                                    <td>{Dossier.comptable.duree_trait ? (<span>{Dossier.comptable.duree_trait}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Observation</td>
                                    <td>{Dossier.comptable.observation ? (<span>{Dossier.comptable.observation}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
        </>
    )
}

export default ConsultationCompatibilite
