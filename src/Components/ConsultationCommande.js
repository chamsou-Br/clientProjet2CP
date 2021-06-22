import React from 'react'

function ConsultationCommande(props) {

    const Dossier = props.Dossier;

    return (
        <>
                <h1 className='titleTable'>Service commande</h1>  
              <div className="table-responsive service">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>champ</th>
                                    <th></th>
                                 
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Date de réception </td>
                                    <td>{Dossier.commande.date_reception ? (<span>{Dossier.commande.date_reception}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>N° du Facture proforma</td>
                                    <td>{Dossier.commande.num_fact_proforma ? (<span>{Dossier.commande.num_fact_proforma}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date facture proforma</td>
                                    <td>{Dossier.commande.date_fact_proforma ? (<span>{Dossier.commande.date_fact_proforma}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Montant</td>
                                    <td>{Dossier.commande.montant ? (<span>{Dossier.commande.montant}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>N° Bon du commande</td>
                                    <td>{Dossier.commande.num_bon_commande ? (<span>{Dossier.commande.num_bon_commande}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date de bon du commande </td>
                                    <td>{Dossier.commande.date_bon_commande ? (<span>{Dossier.commande.date_bon_commande}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date de réception de la prestation</td>
                                    <td>{Dossier.commande.date_reception_prest ? (<span>{Dossier.commande.date_reception_prest}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>N° Facture définitive</td>
                                    <td>{Dossier.commande.num_fact_proforma ? (<span>{Dossier.commande.num_fact_proforma}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>N° Bon de réseption</td>
                                    <td>{Dossier.commande.num_bon_reception ? (<span>{Dossier.commande.num_bon_reception}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Date d'envoi au service budjet</td>
                                    <td>{Dossier.commande.date_envoi ? (<span>{Dossier.commande.date_envoi}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Duré de traitement du dossie</td>
                                    <td>{Dossier.commande.duree_trait ? (<span>{Dossier.commande.duree_trait}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                                <tr>
                                    <td>Observation</td>
                                    <td>{Dossier.commande.observation ? (<span>{Dossier.commande.observation}</span>) : (<span>Pas Encore</span>) }</td>
                                </tr>
                            </tbody>
                </table>
                </div>
        </>
    )
}

export default ConsultationCommande
