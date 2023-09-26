import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
const API_ENDPOINTS = {
    sendOtp: '/apis/proxies/v8/otp/v1/generate',
    ReSendOtp: '/apis/proxies/v8/otp/v1/generate',
    VerifyOtp: '/apis/proxies/v8/otp/v1/verify',
}

@Injectable()
export class OtpService {
    constructor(
        private http: HttpClient,
    ) {
    }
    sendOtp(value: number, type: string): Observable<any> {
        const reqObj = {
            request: {
                type,
                key: `${value}`,
            },
        }
        return this.http.post(API_ENDPOINTS.sendOtp, reqObj)
    }
    resendOtp(value: number, type: string) {
        const reqObj = {
            request: {
                type,
                key: `${value}`,
            },
        }
        return this.http.post(API_ENDPOINTS.ReSendOtp, reqObj)

    }
    verifyOTP(otp: number, value: number, type: string) {
        const reqObj = {
            request: {
                otp,
                type,
                key: `${value}`,
            },
        }
        return this.http.post(API_ENDPOINTS.VerifyOtp, reqObj)

    }
}
