package com.ssafy.berryfit.common.error;

import com.ssafy.berryfit.api.request.SignUpReq;

public class EmailDuplicateException extends InvalidValueException {

    public EmailDuplicateException(final SignUpReq signUpReq) {
        super(signUpReq.getEmail(), ErrorCode.EMAIL_DUPLICATION);
    }
}