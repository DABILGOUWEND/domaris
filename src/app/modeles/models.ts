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
  statut: 'En attente' | 'En cours' | 'Terminé' | 'Suspendu';
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
  statut: 'En attente' | 'En cours' | 'Terminé' | 'Suspendu';
  responsableId: string;
  documents: documents[]|[]; // URLs des documents associés à la phase
  children: phases[]|[],
  taches: taches[]|[], // Liste des tâches associées à la phase 
}

export interface taches {
  nom: string;
  description: string;
  statut: 'En attente' | 'En cours' | 'Terminé' | 'Suspendu';
  responsableId: string;
  documents: documents[]|[];
  poids: number; // Poids de la tâche pour le calcul de l'avancement
  dateDebut: Date | any;
  dateFin: Date | any;
  children: taches[]|[]; // Sous-tâches associées à la tâche
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
  createdAt: Date | any;
  updatedAt: Date | any;
  etat_validation: 'En attente' | 'Validé' | 'Rejeté' | 'En révision';
  validateur_id: string;
  date_validation: Date | any;
  commentaire_validation: string;
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
  id: string,
  intitule: string,
  montant_htva: number,
  description: string
}

// ...existing code...


export const intial_phases: phases[] = [
  {
    "id": "phase-1",
    "nom": "Préparation / Définition du projet",
    "description": "Phase de cadrage, études préalables, montage foncier et financier",
    "dateDebut": "2025-07-11",
    "dateFin": "2025-09-11",
    "statut": "En attente",
    "responsableId": "",
    "documents": [],
    "taches": [],
    "children": [
      {
        "id": "phase-1-1",
        "nom": "Identification du besoin",
        "description": "Analyse des attentes et définition des objectifs",
        "dateDebut": "2025-07-11",
        "dateFin": "2025-07-25",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Organiser un atelier de cadrage",
            "description": "Planifier et animer l'atelier de lancement avec les parties prenantes",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Agenda de l'atelier", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Compte-rendu atelier", 
                "type": "docx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-07-11",
            "dateFin": "2025-07-13",
            "children": []
          },
          {
            "nom": "Rédiger et diffuser la Note de cadrage",
            "description": "Rédiger le document de cadrage et le partager aux acteurs clés",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Note de cadrage", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Liste des participants", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-07-14",
            "dateFin": "2025-07-18",
            "children": []
          },
          {
            "nom": "Valider les objectifs et indicateurs",
            "description": "Obtenir la validation formelle des objectifs projet et des KPI",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "PV de validation des objectifs", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Fiche indicateurs", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-07-19",
            "dateFin": "2025-07-22",
            "children": []
          },
          {
            "nom": "Recueillir les retours et ajuster la note",
            "description": "Compiler les commentaires et mettre à jour la note de cadrage",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Registre des commentaires", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Version mise à jour de la Note de cadrage", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-07-23",
            "dateFin": "2025-07-25",
            "children": []
          }
        ]
      },
      {
        "id": "phase-1-2",
        "nom": "Choix du site",
        "description": "Analyse foncière, certificat d'urbanisme",
        "dateDebut": "2025-07-26",
        "dateFin": "2025-08-15",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Solliciter et récupérer le certificat d'urbanisme",
            "description": "Obtenir et archiver le certificat d'urbanisme auprès de la mairie",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Certificat d'urbanisme", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-07-26",
            "dateFin": "2025-08-01",
            "children": []
          },
          {
            "nom": "Analyser les contraintes foncières",
            "description": "Étudier topographie et servitudes du terrain",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Rapport topographique", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Plan de servitudes", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-08-02",
            "dateFin": "2025-08-08",
            "children": []
          },
          {
            "nom": "Réunion avec urbaniste/géomètre",
            "description": "Convoquer et rédiger le compte-rendu de réunion",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Compte-rendu de réunion", 
                "type": "docx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Plan de bornage", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-08-09",
            "dateFin": "2025-08-12",
            "children": []
          },
          {
            "nom": "Documenter le rapport de faisabilité site",
            "description": "Compiler et valider le rapport de faisabilité foncière",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Rapport de faisabilité foncière", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-08-13",
            "dateFin": "2025-08-15",
            "children": []
          }
        ]
      },
      {
        "id": "phase-1-3",
        "nom": "Étude de faisabilité",
        "description": "Évaluation technique et financière",
        "dateDebut": "2025-08-16",
        "dateFin": "2025-09-11",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Lancer l'appel d'offres pour étude G1",
            "description": "Préparer le dossier et envoyer aux bureaux d'études",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Dossier d'appel d'offres G1", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Liste des bureaux d'études contactés", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-08-16",
            "dateFin": "2025-08-22",
            "children": []
          },
          {
            "nom": "Étude thermique et énergétique préliminaire",
            "description": "Faire réaliser l'étude thermique initiale",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Rapport étude thermique", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-08-23",
            "dateFin": "2025-08-29",
            "children": []
          },
          {
            "nom": "Évaluer le chiffrage financier sommaire",
            "description": "Élaborer un pré-chiffrage budgétaire sommaire",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Excel de pré-chiffrage", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-08-30",
            "dateFin": "2025-09-05",
            "children": []
          },
          {
            "nom": "Synthèse de faisabilité et présentation",
            "description": "Rédiger la synthèse et présenter au comité",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Synthèse PowerPoint", 
                "type": "pptx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "PV de comité", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-09-06",
            "dateFin": "2025-09-11",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "id": "phase-2",
    "nom": "Études",
    "description": "Phase de conception technique et réglementaire",
    "dateDebut": "2025-09-12",
    "dateFin": "2025-12-12",
    "statut": "En attente",
    "responsableId": "",
    "documents": [],
    "taches": [],
    "children": [
      {
        "id": "phase-2-1",
        "nom": "Études préliminaires",
        "description": "Topographie, géotechnique, environnement",
        "dateDebut": "2025-09-12",
        "dateFin": "2025-10-12",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Commander le relevé topographique",
            "description": "Passer la commande du relevé topographique",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Bon de commande topographie", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-09-12",
            "dateFin": "2025-09-18",
            "children": []
          },
          {
            "nom": "Planifier et suivre l'étude géotechnique G1",
            "description": "Établir planning et suivre l'avancement G1",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Planning G1", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-09-19",
            "dateFin": "2025-09-30",
            "children": []
          },
          {
            "nom": "Établir le diagnostic environnemental",
            "description": "Faire réaliser et compiler le diagnostic environnemental",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Rapport environnemental", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-10-01",
            "dateFin": "2025-10-08",
            "children": []
          },
          {
            "nom": "Compiler les rapports",
            "description": "Assembler tous les rapports préliminaires dans un dossier",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Dossier Études préliminaires", 
                "type": "zip", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-10-09",
            "dateFin": "2025-10-12",
            "children": []
          }
        ]
      },
      {
        "id": "phase-2-2",
        "nom": "Avant-Projet Sommaire (APS)",
        "description": "Premiers plans de conception",
        "dateDebut": "2025-10-13",
        "dateFin": "2025-11-12",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Rédiger le cahier des charges APS",
            "description": "Définir le périmètre et les exigences APS",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Cahier des charges APS", 
                "type": "docx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-10-13",
            "dateFin": "2025-10-20",
            "children": []
          },
          {
            "nom": "Dessiner plans masse et coupes",
            "description": "Produire les plans masse et coupes préliminaires",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Plans APS", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-10-21",
            "dateFin": "2025-10-31",
            "children": []
          },
          {
            "nom": "Valider l'implantation MOA",
            "description": "Faire valider l'implantation par le maître d'ouvrage",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "PV validation implantation", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-11-01",
            "dateFin": "2025-11-05",
            "children": []
          },
          {
            "nom": "Mettre à jour documents APS",
            "description": "Intégrer retours et finaliser les documents APS",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Version finale plans APS", 
                "type": "dwg", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-11-06",
            "dateFin": "2025-11-12",
            "children": []
          }
        ]
      },
      {
        "id": "phase-2-3",
        "nom": "Avant-Projet Définitif (APD)",
        "description": "Version détaillée du projet",
        "dateDebut": "2025-11-13",
        "dateFin": "2025-12-12",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Finaliser les plans architecturaux",
            "description": "Produire les plans définitifs détaillés",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Plans APD", 
                "type": "dwg", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-11-13",
            "dateFin": "2025-11-25",
            "children": []
          },
          {
            "nom": "Vérifier conformité aux normes",
            "description": "Contrôler conformité incendie et accessibilité",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Fiche conformité incendie", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Fiche accessibilité", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-11-26",
            "dateFin": "2025-12-02",
            "children": []
          },
          {
            "nom": "Élaborer l'estimation budgétaire détaillée",
            "description": "Préparer le DPGF détaillé",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "DPGF détaillé", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-12-03",
            "dateFin": "2025-12-08",
            "children": []
          },
          {
            "nom": "Organiser la revue APD",
            "description": "Planifier et tenir la revue APD",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Ordre du jour revue APD", 
                "type": "docx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "PV de revue APD", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-12-09",
            "dateFin": "2025-12-12",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "id": "phase-3",
    "nom": "Consultation & passation des marchés",
    "description": "Sélection des entreprises et signature des marchés",
    "dateDebut": "2025-12-13",
    "dateFin": "2026-03-13",
    "statut": "En attente",
    "responsableId": "",
    "documents": [],
    "taches": [],
    "children": [
      {
        "id": "phase-3-1",
        "nom": "Élaboration du DCE",
        "description": "Plans, CCTP, DPGF, RC",
        "dateDebut": "2025-12-13",
        "dateFin": "2026-01-13",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Rédiger le CCTP par lot",
            "description": "Rédiger le cahier des clauses techniques particulières pour chaque lot",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "CCTP Lot gros-œuvre", 
                "type": "docx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "CCTP Lot second-œuvre", 
                "type": "docx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-12-13",
            "dateFin": "2025-12-27",
            "children": []
          },
          {
            "nom": "Préparer le bordereau de prix",
            "description": "Établir le DPGF complet",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Bordereau DPGF", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2025-12-28",
            "dateFin": "2026-01-05",
            "children": []
          },
          {
            "nom": "Vérifier le règlement de consultation",
            "description": "Contrôler et valider le règlement de la consultation",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Règlement de consultation", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-01-06",
            "dateFin": "2026-01-10",
            "children": []
          },
          {
            "nom": "Consolider le dossier DCE",
            "description": "Assembler tous les éléments du DCE dans un dossier final",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "DCE complet", 
                "type": "zip", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-01-11",
            "dateFin": "2026-01-13",
            "children": []
          }
        ]
      },
      {
        "id": "phase-3-2",
        "nom": "Analyse des offres",
        "description": "Ouverture des plis, négociations",
        "dateDebut": "2026-01-14",
        "dateFin": "2026-02-13",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Ouvrir les plis",
            "description": "Organiser l'ouverture officielle des plis",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "PV d'ouverture des plis", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-01-14",
            "dateFin": "2026-01-20",
            "children": []
          },
          {
            "nom": "Vérifier la conformité des offres",
            "description": "Contrôler pièces administratives et techniques",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Tableau comparatif des offres", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-01-21",
            "dateFin": "2026-01-31",
            "children": []
          },
          {
            "nom": "Auditions / négociations",
            "description": "Convoquer et rédiger compte-rendu des négociations",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Invitations à audition", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Compte-rendu négociation", 
                "type": "docx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-02-01",
            "dateFin": "2026-02-08",
            "children": []
          },
          {
            "nom": "Rédiger le rapport d'analyse comparative",
            "description": "Synthétiser et recommander le meilleur lot",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Rapport final analyse offres", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-02-09",
            "dateFin": "2026-02-13",
            "children": []
          }
        ]
      },
      {
        "id": "phase-3-3",
        "nom": "Attribution des marchés",
        "description": "Notification et signature des contrats",
        "dateDebut": "2026-02-14",
        "dateFin": "2026-03-13",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Préparer les lettres d'attribution",
            "description": "Rédiger et envoyer les lettres d'attribution aux entreprises",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Lettre type d'attribution", 
                "type": "docx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-02-14",
            "dateFin": "2026-02-21",
            "children": []
          },
          {
            "nom": "Signer et archiver les contrats",
            "description": "Faire signer et classer les contrats signés",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Contrats signés", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              },
              { 
                "titre": "Suivi marchés", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-02-22",
            "dateFin": "2026-03-06",
            "children": []
          },
          {
            "nom": "Notifier les entreprises",
            "description": "Envoyer la notification officielle aux titulaires de lot",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Notifications envoyées", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": "2025-07-11T10:00:00.000Z",
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-03-07",
            "dateFin": "2026-03-13",
            "children": []
          }
        ]
      }
    ]
  },
   {
    "id": "phase-4",
    "nom": "Exécution des travaux",
    "description": "Réalisation de l'ouvrage selon les plans",
    "dateDebut": "2026-03-14",
    "dateFin": "2026-09-14",
    "statut": "En attente",
    "responsableId": "",
    "documents": [],
    "taches": [],
    "children": [
      {
        "id": "phase-4-1",
        "nom": "Installation de chantier",
        "description": "Préparation des accès, réseaux, sécurité",
        "dateDebut": "2026-03-14",
        "dateFin": "2026-04-14",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Élaborer le plan PTW",
            "description": "Créer le plan de transfert de responsabilités",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Plan PTW", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-03-14",
            "dateFin": "2026-03-21",
            "children": []
          },
          {
            "nom": "Installer bungalows et clôtures",
            "description": "Mettre en place les installations provisoires sur site",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Bon de livraison", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-03-22",
            "dateFin": "2026-03-31",
            "children": []
          },
          {
            "nom": "Mettre en place signalisation & EPI",
            "description": "Installer la signalisation de sécurité et distribuer les EPI",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Plan sécurité chantier", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-04-01",
            "dateFin": "2026-04-08",
            "children": []
          },
          {
            "nom": "Vérifier réseaux provisoires",
            "description": "Contrôler l'alimentation eau et électricité temporaire",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "PV de réception provisoire", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-04-09",
            "dateFin": "2026-04-14",
            "children": []
          }
        ]
      },
      {
        "id": "phase-4-2",
        "nom": "Gros œuvre",
        "description": "Structure, fondations, murs, dalles",
        "dateDebut": "2026-04-15",
        "dateFin": "2026-06-15",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Commander béton et aciers",
            "description": "Passer les commandes matériaux béton et acier",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Bons de commande matériaux", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-04-15",
            "dateFin": "2026-04-22",
            "children": []
          },
          {
            "nom": "Planifier le coulage du radier",
            "description": "Établir le planning de coulage du radier",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Planning coulage", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-04-23",
            "dateFin": "2026-05-15",
            "children": []
          },
          {
            "nom": "Suivre montage murs et dalles",
            "description": "Contrôler et reporter l'avancement des murs et dalles",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Rapports hebdos d'avancement", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-05-16",
            "dateFin": "2026-06-08",
            "children": []
          },
          {
            "nom": "Tenir à jour le journal de chantier",
            "description": "Enregistrer toutes les opérations quotidiennes",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Journal de chantier", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-06-09",
            "dateFin": "2026-06-15",
            "children": []
          }
        ]
      },
      {
        "id": "phase-4-3",
        "nom": "Second œuvre",
        "description": "Plomberie, électricité, finitions",
        "dateDebut": "2026-06-16",
        "dateFin": "2026-09-14",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Planifier plomberie & électricité",
            "description": "Élaborer planning des lots plomberie et électricité",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Planning second-œuvre", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-06-16",
            "dateFin": "2026-07-15",
            "children": []
          },
          {
            "nom": "Suivre la pose des menuiseries",
            "description": "Vérifier la qualité et l'avancement de la menuiserie",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "PV de contrôle menuiseries", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-07-16",
            "dateFin": "2026-08-15",
            "children": []
          },
          {
            "nom": "Organiser les contrôles qualité provisoires",
            "description": "Mettre en place et compiler les fiches de contrôle",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Fiches contrôle", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-08-16",
            "dateFin": "2026-09-05",
            "children": []
          },
          {
            "nom": "Gérer les décomptes des entreprises",
            "description": "Vérifier et valider les états de décompte",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "États de décompte", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-09-06",
            "dateFin": "2026-09-14",
            "children": []
          }
        ]
      }
    ]
  },
    {
    "id": "phase-5",
    "nom": "Réception",
    "description": "Phase de réception des travaux et mise en service",
    "dateDebut": "2026-09-15",
    "dateFin": "2026-12-15",
    "statut": "En attente",
    "responsableId": "",
    "documents": [],
    "taches": [],
    "children": [
      {
        "id": "phase-5-1",
        "nom": "Préparation de la réception",
        "description": "Organisation et préparation de la réception provisoire",
        "dateDebut": "2026-09-15",
        "dateFin": "2026-10-15",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Vérifier l'achèvement des travaux",
            "description": "Contrôler la finalisation de tous les lots de travaux",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Rapport d'achèvement des travaux", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-09-15",
            "dateFin": "2026-09-22",
            "children": []
          },
          {
            "nom": "Constituer la commission de réception",
            "description": "Nommer les membres de la commission et planifier la réception",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Arrêté de nomination commission", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              },
              { 
                "titre": "Planning des visites de réception", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-09-23",
            "dateFin": "2026-09-30",
            "children": []
          },
          {
            "nom": "Préparer les dossiers de réception",
            "description": "Compiler tous les documents nécessaires à la réception",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Dossier de réception complet", 
                "type": "zip", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              },
              { 
                "titre": "Check-list de réception", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-10-01",
            "dateFin": "2026-10-08",
            "children": []
          },
          {
            "nom": "Convoquer la commission de réception",
            "description": "Envoyer les convocations officielles à tous les membres",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Convocations commission", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-10-09",
            "dateFin": "2026-10-15",
            "children": []
          }
        ]
      },
      {
        "id": "phase-5-2",
        "nom": "Réception provisoire",
        "description": "Réception provisoire des ouvrages",
        "dateDebut": "2026-10-16",
        "dateFin": "2026-11-15",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Organiser la visite de réception",
            "description": "Conduire la visite technique avec la commission",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Feuille d'émargement visite", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              },
              { 
                "titre": "Photos de visite", 
                "type": "zip", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-10-16",
            "dateFin": "2026-10-23",
            "children": []
          },
          {
            "nom": "Identifier les réserves",
            "description": "Lister et documenter toutes les réserves identifiées",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Liste des réserves", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              },
              { 
                "titre": "Photos des défauts", 
                "type": "zip", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-10-24",
            "dateFin": "2026-10-31",
            "children": []
          },
          {
            "nom": "Rédiger le procès-verbal de réception",
            "description": "Établir le PV officiel de réception provisoire",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "PV de réception provisoire", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-11-01",
            "dateFin": "2026-11-08",
            "children": []
          },
          {
            "nom": "Notifier la réception aux entreprises",
            "description": "Transmettre le PV aux entreprises concernées",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Lettres de notification", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-11-09",
            "dateFin": "2026-11-15",
            "children": []
          }
        ]
      },
      {
        "id": "phase-5-3",
        "nom": "Levée des réserves",
        "description": "Suivi et validation de la levée des réserves",
        "dateDebut": "2026-11-16",
        "dateFin": "2026-12-15",
        "statut": "En attente",
        "responsableId": "",
        "documents": [],
        "children": [],
        "taches": [
          {
            "nom": "Planifier les travaux de reprise",
            "description": "Établir le planning de levée des réserves",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Planning de levée des réserves", 
                "type": "xlsx", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-11-16",
            "dateFin": "2026-11-23",
            "children": []
          },
          {
            "nom": "Suivre l'exécution des reprises",
            "description": "Contrôler l'avancement des travaux de reprise",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "Rapports de suivi reprises", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-11-24",
            "dateFin": "2026-12-08",
            "children": []
          },
          {
            "nom": "Contrôler la levée des réserves",
            "description": "Vérifier que toutes les réserves sont levées",
            "statut": "En attente",
            "responsableId": "",
            "documents": [
              { 
                "titre": "PV de levée des réserves", 
                "type": "pdf", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              },
              { 
                "titre": "Photos après reprises", 
                "type": "zip", 
                "url": "", 
                "createdAt": "2025-07-11T10:00:00.000Z", 
                "updatedAt": "2025-07-11T10:00:00.000Z",
                "etat_validation": "En attente",
                "validateur_id": "",
                "date_validation": null,
                "commentaire_validation": ""
              }
            ],
            "poids": 1,
            "dateDebut": "2026-12-09",
            "dateFin": "2026-12-15",
            "children": []
          }
        ]
      }
    ]
  }

]
// ...existing code...


