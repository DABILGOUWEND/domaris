import { computed, inject, signal } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, concat, concatMap, forkJoin, map, of, pipe, switchMap, take, tap } from "rxjs";

import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { v4 as uuidv4 } from 'uuid';
import { Auth, authState, user } from "@angular/fire/auth";
import { DateAdapter } from "@angular/material/core";
import { PassThrough } from "node:stream";

import { error } from "node:console";

import e from "express";
import {
  gasoilStore, tab_ProjetStore,
  tab_DevisStore,
  tab_LigneDevisStore,
  ApprogoStore,
  Tab_EnginsStore,
  Tab_classeEnginsStore,
  Tab_personnelStore,
  tab_SoustraitantStore,
  tab_PannesStore, tab_ressourcesStore, tab_famillesStore,
  tab_categoriesStore, tab_compositesStore, tab_contratStore,
  tab_pointageStore, tab_travauxStore, tab_naturetvxStore,
  tab_dateStore, tab_userStore, tab_satatutStore, tab_constatStore,
  tab_AttachementStore, tab_DecompteStore, tab_tachesStore,
  tab_unitesStore, tab_tachesEnginsStore, tab_EntrepriseStore,
  tab_tachesProjetStore, tab_pointage_travauxStore, Tab_classeArticesStore,
  tab_commandesStore, tab_sorties_articlesStore, tab_entrees_articlesStore,
  tab_fournisseursStore, tab_sitesStore, comptes, tab_beneficiairesStore,
  tab_personnel, Projet, Engins, classe_engins, Gasoil, appro_gasoil,
  Pannes, Contrats, pointage, nature_travaux, travaux, Devis, Ligne_devis,
  Constats, ModelAttachement, ModelDecompte, pointage_travaux, datesPointages,
  sous_traitant, tab_categories, tab_familles, fournisseurs, tab_ressources, tab_programmeStore,
  Entreprise
} from "../modeles/models";
import { TaskService } from "../services/task.service";
import { ProgrammesService } from "../services/programmes.service";
import { get } from "node:http";
import { remove, set } from "@angular/fire/database";
const initialGasoilState: gasoilStore = {
  conso_data: [],
  err: null,
  selectedDate: [''],
  message: '',
  date_jour: '',
  selectedEngin: "",
  selectedClass: '',
  path_string: ''
}

///projet
const initialProjetState: tab_ProjetStore =
{
  projets_data: [],
  err: null,
  selectedId: '',
  message: '',
  path_string: ''
}
//devis
const initialDevisState: tab_DevisStore =
{
  devis_data: [],
  message: '',
  selectedEntreprise_id: '',
  selectedProjet_id: '',
  path_string: '',
  current_devis_id: '',
  current_devis: undefined


}
//ligne devis
const initialLigneDevisState: tab_LigneDevisStore =
{
  lignedevis_data: [],
  message: '',
  selectedDevis_id: '',
  path_string: ''
}

const initialApprogoState: ApprogoStore = {
  approgo_data: [],
  err: null,
  path_string: ''
}
const initialEnginState: Tab_EnginsStore = {
  engins: [],
  message: '444777',
  selectedId: '',
  selectedClasseId: '',
  selectedDesignation: '',
  selectedIds: [''],
  path_string: ''
}
const initialClassesE: Tab_classeEnginsStore = {
  classes: [],
  message: '',
  selectedId: '',
  path_string: ''
}
const initialPersonnelState: Tab_personnelStore = {
  personnel_data: [],
  err: null,
  selectedId: '',
  selectedNom_prenom: '',
  message: '',
  current_date: '',
  click: [-1],
  path_string: '',
  is_finished: true


}
const initialSstraitantState: tab_SoustraitantStore =
{
  sstraitant_data: [],
  err: '',
  selectedId: '',
  message: '',
  path_string: ''
}
const initialPannesState: tab_PannesStore =
{
  pannes_data: [],
  err: '',
  selectedId: '',
  message: '',
  intervalleDate: [''],
  EnginsIds: [''],
  path_string: ''
}
const initialResourcesState: tab_ressourcesStore = {
  ressources_data: [],
  message: '',
  selectedId: '',
  selectedIds: [''],
  selectedCatId: '',
  selectedFamId: ''
}
const initialFamillesState: tab_famillesStore = {
  familles_data: [],
  message: '',
  selectedId: '',
  selectedIds: ['']
}
const initialCategorieState: tab_categoriesStore = {
  categories_data: [],
  message: '',
  selectedId: '',
  selectedIds: ['']
}
const initialCompositesState: tab_compositesStore = {
  composites_data: [],
  message: '',
  selectedId: '',
  selectedIds: ['']
}
const initialContratStore: tab_contratStore = {
  contrats_data: [],
  message: '',
  selectedId: '',
  selectedIds: [''],

}
const initialPointageStore: tab_pointageStore =
{
  pointage_data: [],
  message: '',
  selectedId: '',
  selectedIds: ['']
}

const initialTravauxStore: tab_travauxStore =
{
  travaux_data: [],
  message: '',
  selectedId: '',
  selectedIds: [''],
  selectedDate: ''
}

const initialNatureTrvxStore: tab_naturetvxStore =
{
  nature_tvx_data: [],
  message: '',
  selectedId: '',
  selectedIds: ['']
}
const initialDatesState: tab_dateStore =
{
  dates: [],
  message: '',
  selectedId: ''
}
const initialUserState: tab_userStore =
{
  users_data: [],
  url: '/accueil',
  nivo_requis: 0,
  message: '',
  user: 'ff'
}

const initialStatutState: tab_satatutStore =
{
  statut_data: [],
  message: '',
  path_string: ''

}
const initialConstatState: tab_constatStore =
{
  constat_data: [],
  message: '',
  selected_poste_id: '',
  selected_devis_id: '',
  selected_dp: 0,
  path_string: ''
}
const initialAttachementState: tab_AttachementStore =
{
  attachement_data: [],
  message: '',
  selected_devis_id: '',
  selected_num: 0,
  path_string: ''
}
const initialDecompteState: tab_DecompteStore =
{
  decompte_data: [],
  message: '',
  selected_attach_id: '',
  selected_num: 0,
  path_string: ''
}
const initialTachesState: tab_tachesStore =
{
  message: '',
  taches_data: [],
  selected_type: '',
  path_string: ''
}

const initialUnitesState: tab_unitesStore =
{
  message: '',
  unites_data: [],
  path_string: ''
}
const initialTacheEnginsState: tab_tachesEnginsStore =
{
  selectedId: '',
  message: '',
  taches_data: [],
  path_string: ''
}
const initialEntrepriseState: tab_EntrepriseStore =
{
  selectedId: '',
  message: '',
  liste_entreprise: []
}

const initialTacheProjetState: tab_tachesProjetStore =
{
  selectedId: '',
  message: '',
  taches_data: [],
  selectedProjetId: '',
  selectedTacheId: ''
}
const initialPointageTrvxState: tab_pointage_travauxStore =
{
  selectedId: '',
  message: '',
  pointage_data: [],
  selectedDate: '',
  selectedProjetId: '',
  pointage_mach: []
}
const initialClassesArticlesState: Tab_classeArticesStore =
{
  classes_articles: [],
  message: '',
  selectedId: '',
  path_string: ''
}
const initialCommandesState: tab_commandesStore =
{
  commandes_data: [],
  message: '',
  selectedId: '',
  path_string: ''
}
const initialSortiesArticlesState: tab_sorties_articlesStore =
{
  sorties_articles_data: [],
  message: '',
  selectedId: '',
  path_string: ''
}
const initialEntreesArticlesState: tab_entrees_articlesStore =
{
  entrees_articles_data: [],
  message: '',
  selectedId: '',
  path_string: ''
}
const initialFournisseursState: tab_fournisseursStore =
{
  fournisseurs_data: [],
  message: '',
  selectedId: '',
  path_string: ''
}
const initialSitesState: tab_sitesStore =
{
  sites_data: [],
  message: '',
  selectedId: '',
  path_string: ''
}
const initialCompte: comptes =
{
  engins: [],
  personnel: [],
  classes_engins: [],
  appro_go: [],
  conso_go: [],
  pannes: [],
  current_user: undefined,
  selected_engin: '',
  selected_personnel: ''
}
const initialBeneficaireState: tab_beneficiairesStore =
{
  beneficiaires_data: [],
  message: '',
  selectedId: '',
  path_string: ''
}
const initialProgrammeState: tab_programmeStore = {
  programmes_data: [],
  message: '',
  selectedId: '',
  selectedIds: [],
  path_string: '',
  isLoading: false,
  error: null,
  programmes_ids: [],
};
/*************************** */
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialUserState),
  withComputed((store) => (
    {
      taille: computed(() => store.users_data().length),
      users: computed(() => {
        return store.users_data()
      }),
      getUrl: computed(() => store.url())
      ,
      getNivo: computed(() => store.nivo_requis())
    }
  )
  ),
  withMethods((store, _task_service = inject(TaskService), snackbar = inject(MatSnackBar), _auth = inject(Auth)) =>
  (
    {
      setUrl(url: string) {
        patchState(store, { url: url })
      },
      setNivo(nivo: number) {
        patchState(store, { nivo_requis: nivo })
      },

      loadUsers: rxMethod<void>(pipe(switchMap(() => {
        return _task_service.getallModels("domaris_users").pipe(
          tap((data) => {
            patchState(store, { users_data: data })
          })
        )
      }
      ))),
      addUser: rxMethod<any>(pipe(
        switchMap((personnel) => {
          return _task_service.addModel("myusers", personnel).pipe(
            tap({
              next: () => {
                Showsnackerbaralert('ajouté avec succes', 'pass', snackbar)
              },
              error: () => {
                patchState(store, { message: 'echoué' });
                Showsnackerbaralert('échoué', 'fail', snackbar)
              }
            }
            )
          )
        })
      )),
      removeUser: rxMethod<string>(pipe(
        switchMap((id) => {
          return _task_service.deleteModel("myusers", id).pipe(tap({
            next: () => {

              Showsnackerbaralert('élément supprimé', 'pass', snackbar)
            },
            error: () => {
              patchState(store, { message: 'echoué' });
              Showsnackerbaralert('échoué', 'fail', snackbar)
            }
          }
          ))
        }))),
      updateUser: rxMethod<tab_personnel>(pipe(
        switchMap((user) => {
          return _task_service.updateModel("myusers", user).pipe(
            tap({
              next: () => {

                Showsnackerbaralert('modifié avec succes', 'pass', snackbar)
              },
              error: () => {
                patchState(store, { message: 'echoué' });
                Showsnackerbaralert('échoué', 'fail', snackbar)
              }
            }
            )
          )
        })
      )),

    }
  ))
)
export const ProgrammeStore = signalStore(
  { providedIn: 'root' },
  withState(initialProgrammeState),
  withComputed((store) => ({
    total: computed(() => store.programmes_data().length),
    allProgrammes: computed(() => store.programmes_data()),
    selectedProgrammes: computed(() => {
      let data = store.programmes_data().filter(p => store.selectedIds().includes(p.id))
      return data;
    }

    ),
    fn_isLoading: computed(() => store.isLoading),
    fn_error: computed(() => store.error),
    fn_selectedId: computed(() => store.selectedId),
    fn_selectedIds: computed(() => store.selectedIds)
  })
  ),
  withMethods((store, _service = inject(ProgrammesService), snackbar = inject(MatSnackBar)) => ({
    setSelectedId(id: string) {
      patchState(store, { selectedId: id });
    },
    setProgrammeIs(ids: string[]) {
      patchState(store, { selectedIds: ids })
    }
    ,
    loadAllData: rxMethod<void>(
      pipe(
        switchMap(() => _service.getProgrammes()),
        switchMap((programmes) => {
          const data = programmes.map(
            programme => forkJoin({
              phases: _service.get_sousCollection(programme.id,"phases").pipe(take(1)),
              budgets: _service.get_sousCollection(programme.id,"budgets").pipe(take(1)),
            }).pipe(map(resp => {
              return {
                ...programme,
                phases: resp.phases,
                budgets: resp.budgets
              }
            }))
          );
          return forkJoin(data)
        }),
        tap(resp => {
          console.log(resp);
          patchState(store, { programmes_data: resp });
        })
      )
    ),
    addProgramme: rxMethod<any>(
      pipe(
        switchMap((programme) => _service.addProgramme(programme)),
        tap({
          next: () => {
            Showsnackerbaralert('Programme créé avec succès !', 'pass', snackbar);
          },
          error: () => {
            Showsnackerbaralert('Erreur lors de la création du programme.', 'fail', snackbar);
          }
        })
      )
    ),
    updateProgramme: rxMethod<any>(
      pipe(
        switchMap((programme) => _service.updateProgramme(programme)),
        tap({
          next: () => {
            Showsnackerbaralert('Programme modifié avec succès !', 'pass', snackbar);
          },
          error: () => {
            Showsnackerbaralert('Erreur lors de la modification du programme.', 'fail', snackbar);
          }
        })
      )
    ),
    removeProgramme: rxMethod<string>(
      pipe(switchMap((programmeId) => _service.removeProgramme(programmeId)),
        tap(() => {
          patchState(store, { message: 'programme supprimé!' });
          Showsnackerbaralert('Programme supprimé', 'pass', snackbar);
        })
      ),)
  }))
)
export const EntrepriseStore = signalStore(
  { providedIn: 'root' },
  withState(initialEntrepriseState),
  withComputed((store) => ({
    total: computed(() => store.liste_entreprise().length),
    allEntreprises: computed(() => store.liste_entreprise()),
    fn_selectedId: computed(() => store.selectedId()),
    selectedEntreprise: computed(() =>
      store.liste_entreprise().find(e => e.id === store.selectedId())
    )
  })),
  withMethods((store, _task_service = inject(TaskService), snackbar = inject(MatSnackBar)) => ({
    loadAllData: rxMethod<void>(
      pipe(
        switchMap(() => _task_service.getallModels("entreprises")),
        tap((entreprises: Entreprise[]) => {
          patchState(store, { liste_entreprise: entreprises });
        })
      )
    ),
    addEntreprise: rxMethod<Entreprise>(
      pipe(
        switchMap((entreprise) => _task_service.addModel("entreprises", entreprise)),
        tap(() => {
          patchState(store, { message: 'Entreprise ajoutée !' });
          Showsnackerbaralert('Entreprise ajoutée avec succès', 'pass', snackbar);
        })
      )
    ),
    updateEntreprise: rxMethod<Entreprise>(
      pipe(
        switchMap((entreprise) => _task_service.updateModel("entreprises", entreprise)),
        tap(() => {
          patchState(store, { message: 'Entreprise modifiée !' });
          Showsnackerbaralert('Entreprise modifiée avec succès', 'pass', snackbar);
        })
      )
    ),
    deleteEntreprise: rxMethod<string>(
      pipe(
        switchMap((id) => _task_service.deleteModel("entreprises", id)),
        tap(() => {
          patchState(store, { message: 'Entreprise supprimée !' });
          Showsnackerbaralert('Entreprise supprimée', 'pass', snackbar);
        })
      )
    ),
    selectEntreprise(id: string) {
      patchState(store, { selectedId: id });
    }
  }))
);
function convertDate(strdate: string): Date {
  const [day1, month1, year1] = strdate.split("/")
  const date1 = new Date(+year1, +month1 - 1, +day1)
  return date1
}
function classeTabDate(mytable: any[]) {
  return mytable.sort((a, b) => { return new Date(convertDate(b.date)).getTime() - new Date(convertDate(a.date)).getTime() });
}
function classeTabDateGas(mytable: Gasoil[]) {
  return mytable.sort((a, b) => new Date(convertDate(b.date)).getTime() - new Date(convertDate(a.date)).getTime());
}
function classeTabBynumero(mytable: Gasoil[]) {
  return mytable.sort((a, b) => b.numero - a.numero);
}
function classeTabBynumeroDec(mytable: Gasoil[]) {
  return mytable.sort((a, b) => Number(a.numero) - Number(b.numero));
}
function classeTabDatePanne(mytable: Pannes[]) {
  return mytable.sort((a, b) => new Date(convertDate(b.debut_panne)).getTime() - new Date(convertDate(a.debut_panne)).getTime());
}
function classeTabDatePannes(mytable: Pannes[]) {
  return mytable.sort((a, b) => new Date(convertDate(b.debut_panne)).getTime() - new Date(convertDate(a.debut_panne)).getTime());
}
function somme(tab: any) {
  let som = 0
  for (let row of tab) {
    som = som + Number(row)
  }
  return som
}
function classement(mytable: string[]) {
  return mytable.sort((a: string, b: string) => {
    const [day1, month1, year1] = a.split("/")
    const [day2, month2, year2] = b.split("/")
    const date1 = new Date(+year1, +month1 - 1, +day1)
    const date2 = new Date(+year2, +month2 - 1, +day2)
    return date2.getTime() - date1.getTime()
  });
}
function classeEngins(mytable: Engins[]) {
  return mytable.sort((a, b) => a.designation.localeCompare(b.designation));
}
function classePersonnel(mytable: tab_personnel[]) {
  return mytable.sort((a, b) => (a.nom + a.prenom).localeCompare(b.nom + b.prenom));
}
function classeProjet(mytable: Projet[]) {
  return mytable.sort((a, b) => (a.id.localeCompare(b.id)));
}
function classeSstraitant(mytable: sous_traitant[]) {
  return mytable.sort((a, b) => (a.entreprise.localeCompare(b.entreprise)));
}
function classeRessources(mytable: tab_ressources[]) {
  return mytable.sort((a, b) => (a.designation.localeCompare(b.designation)));
}

function classement_classes(mytable: classe_engins[]) {
  return mytable.sort((a, b) => a.designation.localeCompare(b.designation));
}
function classement_Ldevis(mytable: Ligne_devis[]) {
  return mytable.sort((a, b) => (a.code.toString()).localeCompare(b.code.toString()));
}
function getfin_date(date: string) {
  let num_month1 = convertDate(date).getMonth();
  let num_month2 = num_month1 == 11 ? 0 : num_month1 + 1;
  let annee1 = convertDate(date).getFullYear();
  let annee2 = num_month1 == 11 ? annee1 + 1 : annee1;
  return convertDate('20/' + (num_month2 + 1) + '/' + annee2);
}

function Showsnackerbaralert(message: string, resptype: string = 'fail', _snackbar: MatSnackBar) {
  let _class = resptype == 'pass' ? 'text-green' : 'text-red';
  let a = _snackbar.open(message, 'ok',
    {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
      panelClass: [_class]

    })
  return a
}
