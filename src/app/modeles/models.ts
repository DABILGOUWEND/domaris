export interface Engins {
  id: string,
  designation: string,
  code_parc: string,
  immatriculation: string,
  utilisateur_id: string,
  classe_id: string,
}

export interface classe_engins {
  id: string,
  designation: string,
  taches: string[]
}
export interface tab_gasoil {
  date: string,
  quantite_go: string,
  compteur: string
}
export interface tab_Pannes {
  debut_panne: string,
  fin_panne: string,
  heure_debut: string,
  heure_fin: string,
  motif_panne: string,
  situation: string
}
export interface tab_travaux {
  date: string,
  tacheId: string,
  duree: string,
}
export interface Pannes {
  id: string,
  engin_id: string,
  debut_panne: string,
  fin_panne: string,
  heure_debut: string,
  heure_fin: string
  motif_panne: string,
  situation: string
}

export interface Gasoil {
  id: string,
  engin_id: string,
  compteur: number,
  quantite_go: number,
  date: string,
  diff_work: number,
  numero: number
}

export interface appro_gasoil {
  id: string,
  date: string,
  quantite: number,
  reception: string
}


export interface conso {
  id: string,
  date: string,
  conso: number
}
export interface tab_personnel {
  id: string,
  nom: string,
  prenom: string,
  fonction: string,
  num_phone1: string,
  num_phone2: string,
  email: string,
  num_matricule: string,
  dates: string[],
  heuresN: number[],
  heureSup: number[],
  presence: boolean[],
  statut_id: string
}


export interface valueXY {
  x: string,
  y: number
}
export interface sous_traitant {
  id: string,
  entreprise: string,
  enseigne: string,
  ifu: string,
  rccm: string,
  adresse: string,
  phone: string,
  nom_responsable: string,
  prenom_responsable: string,
  date_naissance: string,
  lieu_naissance: string,
  num_cnib: string
}

export interface Projet {
  id: string
  code: string,
  intitule: string,
  maitre_ouvrage: string,
  maitre_oeuvre: string,
  entreprise_id: string,
  financement: string,
  descrip_travaux: string,

}
export interface Devis {
  id: string,
  code: string,
  client_id: string,
  entreprise_id: string,
  projet_id: string,
  objet: string,
  reference: string,
  montant: number,
  avance: number,
  data: element_devis[]
  decompte: element_decompte[]
}
export interface Ligne_devis {
  id: string,
  code: string,
  devis_id: string,
  parent_code: string,
  designation: string,
  prix_u: number,
  unite: string,
  quantite: number,
  montant: number,
  collapsed: boolean,
  isvisible: boolean
  poste: string,
}
export interface element_devis {
  poste: string,
  designation: string,
  prix_u: number | null,
  unite: string,
  quantite: number | null,
  constat: element_constat[],
  children: element_devis[]

}
export interface ExampleFlatNode {
  expandable: boolean,
  poste: string,
  designation: string,
  prix_u: number | null,
  unite: string,
  quantite: number | null,
  level: number,
  montant: number | null,
}
export interface ExampleFlatNode2 {
  expandable: boolean,
  poste: string,
  designation: string,
  prix_u: number | null,
  unite: string,
  quantite: number | null,
  level: number,
  quantite_prec: number | null,
  quantite_periode: number | null,
  quantite_cumul: number | null,
}
export interface FlatNodeAttachement {
  expandable: boolean,
  poste: string,
  designation: string,
  prix_u: number | null,
  unite: string,
  quantite: number | null,
  level: number,
  quantite_prec: number | null,
  quantite_periode: number | null,
  quantite_cumul: number | null,
  montant_prec: number | null,
  montant_periode: number | null,
  montant_cumul: number | null,
  montant: number | null,
}
export interface element_constat {
  numero: number,
  quantite_periode: number,
  date: string,
  description: string,
  numero_decompte: number

}
export interface element_decompte {
  numero: number,
  date: string,
  retenue_garantie: number,
  rembours_avance: number,
  autre_retenue: number,

}



export interface Contrats {
  id: string,
  projet_id: string,
  sous_traitant_id: string,
  montant: number,
  duree_travaux: string,
  montant_avance: number,
}


export interface pointage {
  id: string,
  personnel_id: string,
  date: string,
  presence: {
    is_present: boolean,
    nbre_heure: number
  },
  heure_sup: number
}

export interface gasoilStore {
  conso_data: Gasoil[],
  err: string | null,
  selectedDate: string[],
  message: string,
  date_jour: string,
  selectedEngin: string,
  selectedClass: string,
  path_string: string
}

export interface Tab_personnelStore {
  personnel_data: tab_personnel[],
  err: string | null,
  selectedId: string,
  selectedNom_prenom: string,
  message: string,
  current_date: string,
  click: number[],
  path_string: string,
  is_finished: boolean
}

export interface PointageStore {
  pointage_data: pointage[],
  err: string | null,
  message: string
}

export interface ApprogoStore {
  approgo_data: appro_gasoil[],
  err: string | null,
  path_string: string,

}
export interface Tab_classeEnginsStore {
  classes: classe_engins[],
  message: string,
  selectedId: string,
  path_string: string
}
export interface Tab_EnginsStore {
  engins: Engins[],
  message: string,
  selectedId: string,
  selectedIds: string[],
  selectedClasseId: string,
  selectedDesignation: string,
  path_string: string
}
export interface tab_ProjetStore {
  projets_data: Projet[],
  err: string | null,
  selectedId: string,
  message: string;
  path_string: string


}
export interface tab_SoustraitantStore {
  sstraitant_data: sous_traitant[],
  err: string | null,
  selectedId: string,
  message: string,
  path_string: string
}

export interface tab_PannesStore {
  pannes_data: Pannes[],
  err: string | null,
  selectedId: string,
  message: string,
  intervalleDate: string[],
  EnginsIds: string[],
  path_string: string
}
export interface tab_ressources {
  id: string,
  designation: string,
  unite: string,
  prix_unitaire: number,
  categorie_id: string,
  code: string
}
export interface tab_familles {
  id: string,
  designation: string,
  description: string
}
export interface tab_categories {
  id: string,
  famille_id: string,
  designation: string
}
export interface tab_ressourcesStore {
  ressources_data: tab_ressources[],
  message: string,
  selectedId: string,
  selectedIds: string[],
  selectedCatId: string,
  selectedFamId: string
}
export interface tab_famillesStore {
  familles_data: tab_familles[],
  message: string,
  selectedId: string,
  selectedIds: string[]
}
export interface tab_composites {
  id: string,
  ressource_id: string,
  quantite: number
}
export interface tab_compositesStore {
  composites_data: tab_composites[],
  message: string,
  selectedId: string,
  selectedIds: string[]
}
export interface tab_categoriesStore {
  categories_data: tab_categories[],
  message: string,
  selectedId: string,
  selectedIds: string[]
}
export interface tab_contratStore {
  contrats_data: Contrats[],
  message: string,
  selectedId: string,
  selectedIds: string[],

}
export interface tab_pointageStore {
  pointage_data: pointage[],
  message: string,
  selectedId: string,
  selectedIds: string[],
}
export interface nature_travaux {
  id: string,
  designation: string,
  unite: string
}
export interface travaux {
  id: string,
  date: string,
  nature_id: string,
  quantite: string,
  engin_id: string
}
export interface tab_naturetvxStore {
  nature_tvx_data: nature_travaux[],
  message: string,
  selectedId: string,
  selectedIds: string[]
}
export interface tab_travauxStore {
  travaux_data: travaux[],
  message: string,
  selectedId: string,
  selectedIds: string[],
  selectedDate: string
}
export interface tab_Essais {
  id: string,
  designation: string,
  datas: number[],
  date: string[]
}
export interface datesPointages {
  dates: string
}

export interface tab_dateStore {
  dates: datesPointages[],
  message: string,
  selectedId: string,
}
export interface Users {
  uid: string,
  email: string,
  token: string,
  role: string,
  entreprise_id: string,
  projet_id: string[],
  current_projet_id: string,
  username: string
}
export interface tab_userStore {
  users_data: Users[],
  url: string,
  nivo_requis: number,
  message: string,
  user: any
}

export interface Statuts {
  id: string,
  designation: string
}
export interface tab_satatutStore {
  statut_data: Statuts[],
  message: string,
  path_string: string
}
export interface tab_DevisStore {
  devis_data: Devis[],
  message: string,
  selectedEntreprise_id: string,
  selectedProjet_id: string,
  path_string: string
  current_devis_id: string,
  current_devis: Devis | undefined
}
export interface tab_LigneDevisStore {
  lignedevis_data: Ligne_devis[],
  message: string,
  selectedDevis_id: string,
  path_string: string
}
export interface Constats {
  id: string,
  poste_id: string,
  date: string,
  numero: number,
  rang: number,
  quantite_mois: number,
  description: string,
  decompte_id: string,
  devis_id: string
}
export interface tab_constatStore {
  constat_data: Constats[],
  message: string,
  selected_poste_id: string,
  selected_devis_id: string,
  selected_dp: number,
  path_string: string
}
export interface ModelAttachement {
  id: string,
  devis_id: string,
  numero: number,
  date: string
}
export interface tab_AttachementStore {
  attachement_data: ModelAttachement[],
  message: string,
  selected_devis_id: string,
  selected_num: number,
  path_string: string
}
export interface ModelDecompte {
  id: string,
  retenue_avance: number,
  autre_retenue: number,
  devis_id: string,
  numero: number,
  date: string,
  date_depot_bureau: string,
  date_paiement: string
}
export interface tab_DecompteStore {
  decompte_data: ModelDecompte[],
  message: string,
  selected_attach_id: string,
  selected_num: number,
  path_string: string
}

export interface tab_tachesStore {
  taches_data: taches[],
  selected_type: string,
  message: string,
  path_string: string
}
export interface pointage_machine {
  'id': string,
  'tache_id': string
  'engin_id': string,
  'duree': number
}


export interface unites {
  'id': string,
  'unite': string
}

export interface tab_unitesStore {
  unites_data: unites[],
  message: string,
  path_string: string
}
export interface taches_engins {
  'id': string,
  'taches': string,
  'uniteId': string
}
export interface tab_tachesEnginsStore {
  taches_data: taches_engins[],
  message: string,
  selectedId: string,
  path_string: string
}
export interface taches_projet {
  'id': string,
  'projetId': string,
  'tacheId': string,
  'quantiteDqe': number

}
export interface taches_projet_exec {
  'tache_projet_id': string,
  'quantite_exec': number
}
export interface tab_tachesProjetStore {
  taches_data: taches_projet[],
  message: string,
  selectedId: string,
  selectedProjetId: string,
  selectedTacheId: string
}
export interface Entreprise {
  'id': string,
  'code': string,
  'enseigne': string,
  'adresse': string,
  'telephone': string,
  'email': string,
  "site_web": string,
  'ifu': string,
  'rccm': string,
  'signataire': string,
}
export interface tab_EntrepriseStore {
  liste_entreprise: Entreprise[],
  message: string,
  selectedId: string
}
export interface pointage_travaux {
  'id': string,
  'projetId': string,
  'date': string,
  'pointage_mach': pointage_machine[],
  'metre_travaux': taches_projet_exec[]
}
export interface tab_pointage_travauxStore {
  pointage_data: pointage_travaux[],
  message: string,
  selectedId: string,
  selectedDate: string,
  selectedProjetId: string,
  pointage_mach: pointage_machine[]
}
export interface comptes {
  'engins': Engins[],
  'personnel': tab_personnel[],
  'classes_engins': classe_engins[],
  'conso_go': Gasoil[],
  'appro_go': appro_gasoil[],
  'pannes': Pannes[],
  'current_user': Users | undefined,
  'selected_engin': string,
  'selected_personnel': string
}
export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
export interface classes_articles {
  'id': string,
  'designation': string,
  'createur_id': string
}
export interface Tab_classeArticesStore {
  classes_articles: classes_articles[],
  message: string,
  selectedId: string,
  path_string: string
}

export interface articles {
  'id': string,
  'designation': string,
  'code': string,
  'categorie_id': string,
  'unite': string,
}
export interface commandes {
  'id': string,
  'date_commande': string | undefined,
  'demandeur': string | undefined,
  'articles_commandes': article_commande[],
  'projet_id': string,
  'numero_commande': string,
  'validation': 'validé' | 'non validé',
  'livraison': 'livré' | 'non livré',
  'time': number
}
export interface article_commande {
  'article_id': string,
  'quantite': number,
  'fournisseur_id': string,
  'date_livraison': string
}

export interface tab_commandesStore {
  commandes_data: commandes[],
  message: string,
  selectedId: string,
  path_string: string
}
export interface sorties_articles {
  'id': string,
  'date': string,
  'quantite': number,
  'projet_id': string,
  'article_id': string,
  'motif': string,
  'beneficiaire_id': string,
  'utilisateur_id': string
}
export interface tab_sorties_articlesStore {
  sorties_articles_data: sorties_articles[],
  message: string,
  selectedId: string,
  path_string: string
}
export interface entrees_articles {
  'id': string,
  'date': string,
  'quantite': number,
  'projet_id': string,
  'article_id': string,
  'fournisseur_id': string,
  'utilisateur_id': string | undefined,
  'receptionniste_id': string,
  'site_id': string,
  'time': number,
  'num_bc': string
}
export interface tab_entrees_articlesStore {
  entrees_articles_data: entrees_articles[],
  message: string,
  selectedId: string,
  path_string: string
}
export interface fournisseurs {
  'id': string,
  'designation': string,
  'adresse': string,
  'phone': string,
  'email': string,
  'ifu': string,
  'rccm': string
}
export interface tab_fournisseursStore {
  fournisseurs_data: fournisseurs[],
  message: string,
  selectedId: string,
  path_string: string
}
export interface sites {
  'id': string,
  'designation': string
}
export interface tab_sitesStore {
  sites_data: sites[],
  message: string,
  selectedId: string,
  path_string: string
}

export interface beneficiaires {
  'id': string,
  'personnel_id': string
}
export interface tab_beneficiairesStore {
  beneficiaires_data: beneficiaires[],
  message: string,
  selectedId: string,
  path_string: string
}
export interface Programme {
  id: string;
  nom: string;
  description?: string;
  type?: 'Résidentiel' | 'Commercial' | 'Mixte' | string;
  statut: 'Planifié' | 'En cours' | 'Terminé' | 'Suspendu';
  dateDebut: Date | any;
  dateFin: Date | any;
  budgetPrevu: number;
  pays?: string;         // Pays du programme
  ville?: string;
  quartier?: string;
  responsableId?: string;
  createdAt?: Date | any;
  updatedAt?: Date | any;
  phases: phases[];
  budgets:budgets[];
   // Liste des phases associées au programme
}

export interface phases {
  id: string;
  nom: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  statut: 'En attente' | 'En cours' | 'Terminée';
  responsableId: string;
  documents: documents[]|[]; // URLs des documents associés à la phase
  children: phases[]|[]
}

export interface taches {
  id?: string;
  titre: string;
  description: string;
  statut: 'À faire' | 'En cours' | 'Terminée';
  dateEcheance: Date | any;
  responsableId?: string;
}

export interface depenses {
  id?: string;
  montant_prevu: number,
  montant_paye: number,
  intitule: string,
  date: Date | any,
  url_documents?: string
}

export interface DocumentProgramme {
  id?: string;
  nom: string;
  type: string; // ex: "pdf", "image"
  url: string;
  phaseId?: string;
}
export interface documents {
  titre: string;
  type: string; // ex: "pdf", "image"
  url: string;
  createdAt?: Date | any;
  updatedAt?: Date | any;
}
export interface tab_programmeStore {
  programmes_data: any[];
  message: string;
  selectedId: string;
  selectedIds: string[];
  programmes_ids: string[];
  path_string: string;
  isLoading?: boolean;
  error?: string | null;

}
export interface budgets {
  id?: string,
  intitule: string,
  montant_htva: number,
  date: Date | any,
  description?: string,
  url_document?: string[],
}
export const intial_phases: phases[] =[
  {
    "id": "",
    "nom": "Préparation / Définition du projet",
    "description": "Phase de cadrage, études préalables, montage foncier et financier",
    "statut": "En attente",
    "children": [
      {
        "id": "",
        "nom": "Identification du besoin",
        "description": "Analyse des attentes et définition des objectifs",
        "statut": "En attente",
        "documents": [
          {
            "titre": "Note de cadrage",
            "type": "pdf",
            "url": "",
            "createdAt": "2025-06-07T13:50:31.155664",
            "updatedAt": "2025-06-07T13:50:31.155674"
          }
        ],
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": ""
      },
      {
        "id": "",
        "nom": "Choix du site",
        "description": "Analyse foncière, certificat d’urbanisme",
        "statut": "En attente",
        "documents": [
          {
            "titre": "Certificat d’urbanisme",
            "type": "pdf",
            "url": "",
            "createdAt": "2025-06-07T13:50:31.155678",
            "updatedAt": "2025-06-07T13:50:31.155680"
          }
        ],
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": ""
      },
      {
        "id": "",
        "nom": "Étude de faisabilité",
        "description": "Évaluation technique et financière",
        "statut": "En attente",
        "documents": [
          {
            "titre": "Étude de faisabilité",
            "type": "pdf",
            "url": "",
            "createdAt": "2025-06-07T13:50:31.155685",
            "updatedAt": "2025-06-07T13:50:31.155687"
          }
        ],
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": ""
      }
    ],
    "dateDebut": "",
    "dateFin": "",
    "responsableId": "",
    "documents": []
  },
  {
    "id": "",
    "nom": "Études",
    "description": "Phase de conception technique et réglementaire",
    "statut": "En attente",
    "children": [
      {
        "id": "",
        "nom": "Études préliminaires",
        "description": "Topographie, géotechnique, environnement",
        "statut": "En attente",
        "documents": [
          {
            "titre": "Rapport G1",
            "type": "pdf",
            "url": "",
            "createdAt": "2025-06-07T13:50:31.155691",
            "updatedAt": "2025-06-07T13:50:31.155693"
          },
          {
            "titre": "Plan topographique",
            "type": "image",
            "url": "",
            "createdAt": "2025-06-07T13:50:31.155695",
            "updatedAt": "2025-06-07T13:50:31.155698"
          }
        ],
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": ""
      },
      {
        "id": "",
        "nom": "Avant-Projet Sommaire (APS)",
        "description": "Premiers plans de conception",
        "statut": "En attente",
        "documents": [
          {
            "titre": "Plans APS",
            "type": "pdf",
            "url": "",
            "createdAt": "2025-06-07T13:50:31.155700",
            "updatedAt": "2025-06-07T13:50:31.155702"
          }
        ],
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": ""
      },
      {
        "id": "",
        "nom": "Avant-Projet Définitif (APD)",
        "description": "Version détaillée du projet",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      }
    ],
    "dateDebut": "",
    "dateFin": "",
    "responsableId": "",
    "documents": []
  },
  {
    "id": "",
    "nom": "Consultation & passation des marchés",
    "description": "Sélection des entreprises et signature des marchés",
    "statut": "En attente",
    "children": [
      {
        "id": "",
        "nom": "Élaboration du DCE",
        "description": "Plans, CCTP, DPGF, RC",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      },
      {
        "id": "",
        "nom": "Analyse des offres",
        "description": "Ouverture des plis, négociations",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      },
      {
        "id": "",
        "nom": "Attribution des marchés",
        "description": "Notification et signature des contrats",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      }
    ],
    "dateDebut": "",
    "dateFin": "",
    "responsableId": "",
    "documents": []
  },
  {
    "id": "",
    "nom": "Exécution des travaux",
    "description": "Réalisation de l’ouvrage selon les plans",
    "statut": "En attente",
    "children": [
      {
        "id": "",
        "nom": "Installation de chantier",
        "description": "Préparation des accès, réseaux, sécurité",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      },
      {
        "id": "",
        "nom": "Gros œuvre",
        "description": "Structure, fondations, murs, dalles",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      },
      {
        "id": "",
        "nom": "Second œuvre",
        "description": "Plomberie, électricité, finitions",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      }
    ],
    "dateDebut": "",
    "dateFin": "",
    "responsableId": "",
    "documents": []
  },
  {
    "id": "",
    "nom": "Réception",
    "description": "Contrôle qualité, OPR, levée des réserves",
    "statut": "En attente",
    "children": [
      {
        "id": "",
        "nom": "Opérations Préalables à la Réception",
        "description": "Tests, vérifications, constatations",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      },
      {
        "id": "",
        "nom": "Réception des ouvrages",
        "description": "Signature des PV et transfert de responsabilité",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      }
    ],
    "dateDebut": "",
    "dateFin": "",
    "responsableId": "",
    "documents": []
  },
  {
    "id": "",
    "nom": "Exploitation & garanties",
    "description": "Suivi post-livraison et garanties légales",
    "statut": "En attente",
    "children": [
      {
        "id": "",
        "nom": "Garantie de parfait achèvement",
        "description": "1 an après réception",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      },
      {
        "id": "",
        "nom": "Garantie biennale",
        "description": "Sur les éléments démontables",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      },
      {
        "id": "",
        "nom": "Garantie décennale",
        "description": "Sur la structure de l’ouvrage",
        "statut": "En attente",
        "children": [],
        "dateDebut": "",
        "dateFin": "",
        "responsableId": "",
        "documents": []
      }
    ],
    "dateDebut": "",
    "dateFin": "",
    "responsableId": "",
    "documents": []
  }
]