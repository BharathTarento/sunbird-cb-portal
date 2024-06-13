import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Subject, Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { NSSearch } from '@sunbird-cb/consumption/lib/_models/widget-search.model'
import _ from 'lodash'

const API_ENDPOINTS = {
  SEARCH_V6: `/apis/proxies/v8/sunbirdigot/search`,
  // GET_COMPETENCY_AREA: `/apis/protected/v8/frac/getAllNodes/competencyarea`,
  SEARCH_COMPETENCY: `/apis/proxies/v8/searchBy/competency`,
  COMPETENCY_LIST: `apis/proxies/v8/competency/v4/search`,
  CERTIFICATE_URL: `apis/protected/v8/cohorts/course/batch/cert/download/`,
  CONTENT_SEARCH_V6: `/apis/proxies/v8/sunbirdigot/search`,
}

@Injectable({
  providedIn: 'root',
})
export class BrowseCompetencyService {
  private removeFilter = new Subject<any>()
  private displayLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false)
  private displaySearchLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false)
  /**
   * Observable string streams
   */
  notifyObservable$ = this.removeFilter.asObservable()
  constructor(private http: HttpClient) { }

  public isLoading(): Observable<boolean> {
    return this.displayLoader$
  }

  public isSearchLoading(): Observable<boolean> {
    return this.displaySearchLoader$
  }

  fetchSearchData(request: any): Observable<any> {
    this.displaySearchLoader$.next(true)
    return this.http.post<any>(API_ENDPOINTS.SEARCH_V6, request)
    .pipe(finalize(() => this.displaySearchLoader$.next(false)))
  }

  searchCompetency(_searchData: any): Observable<any> {
    this.displayLoader$.next(true)
    return this.http.get<any>(API_ENDPOINTS.SEARCH_COMPETENCY)
    .pipe(finalize(() => this.displayLoader$.next(false)))
  }

  // fetchCompetencyAreas(): Observable<any> {
  //   return this.http.get<any>(API_ENDPOINTS.GET_COMPETENCY_AREA)
  // }

  public notifyOther(data: any) {
    if (data) {
      this.removeFilter.next(data)
    }
  }

  getCompetencyList(payload: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.COMPETENCY_LIST, payload)
  }

  searchV6(req: NSSearch.ISearchV6Request): Observable<NSSearch.ISearchV6ApiResultV2> {
    const apiPath = _.get(req, 'api.path')
    req.query = req.query || ''
    if (apiPath) {
      return this.http.get<NSSearch.ISearchV6ApiResultV2>(apiPath)
    }
    return this.http.post<NSSearch.ISearchV6ApiResultV2>(API_ENDPOINTS.CONTENT_SEARCH_V6, req)
  }

}
