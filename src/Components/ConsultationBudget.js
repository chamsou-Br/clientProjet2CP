import React from 'react'

function ConsultationBudget(props) {

    const Dossier = props.Dossier;

    return (
        <>
        <div >
        
            <div className="table-responsive service">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr style={{color : '#1a1a2e' , fontWeight : '600'}}>
                                    <th>Service Budget</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody style={{color : '#1a1a2e' , fontWeight : '600'}}>
                                <tr>
                                    <td>Date de réception</td>
                                    <td>{Dossier.budget.date_reception ? (<span>{Dossier.budget.date_reception}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date d'engagement au CF</td>
                                    <td>{Dossier.budget.date_engag_cf ? (<span>{Dossier.budget.date_engag_cf}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Motifs de rejet éventuel</td>
                                    <td>{Dossier.budget.motifs_rejet ? (<span>{Dossier.budget.motifs_rejet}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date de Visa/rejet définitif du contrôleur financier</td>
                                    <td>{Dossier.budget.date_visa_rejet ? (<span>{Dossier.budget.date_visa_rejet}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date de mandatement</td>
                                    <td>{Dossier.budget.date_mandatement ? (<span>{Dossier.budget.date_mandatement}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date d'envoi au service Comptable</td>
                                    <td>{Dossier.budget.date_transm ? (<span>{Dossier.budget.date_transm}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Duré de traitement du dossie</td>
                                    <td>{Dossier.budget.duree_trait ? (<span>{Dossier.budget.duree_trait}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Observation</td>
                                    <td>{Dossier.budget.observations ? (<span>{Dossier.budget.observations}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                            </tbody>
                    </table>
                    </div>
                    </div>

        </>
    )
}

export default ConsultationBudget
