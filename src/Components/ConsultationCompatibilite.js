import React from 'react'

function ConsultationCompatibilite(props) {

    const Dossier = props.Dossier;

    return (
        <>
                <div className="table-responsive service">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr style={{color : '#1a1a2e' , fontWeight : '600'}}>
                                    <th>Service Compatibilité</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody style={{color : '#1a1a2e' , fontWeight : '600'}}>
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
                                    <td>{Dossier.comptable.observations ? (<span>{Dossier.comptable.observations}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
        </>
    )
}

export default ConsultationCompatibilite
