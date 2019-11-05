"use strict";

const {sign, verify} = require('jsonwebtoken'),
    isEmpty = require('is-empty');

class Token{
    constructor(srt_key, exp){
        this.key = srt_key;
        this.time = exp;
    }

    set Key(srt_key){
        this.key = srt_key;
    }

    set Time(exp){
        this.time = exp;
    }

    set Msg(obj_msg){
        this.msg = obj_msg;
    }

    set Token(srt_token){
        this.token = srt_token;
    }

    setKey(srt_key){
        this.key = srt_key;

        return this;
    }

    setTime(exp){
        this.time = exp;

        return this;
    }

    setMsg(obj_msg){
        this.msg = obj_msg;

        return this;
    }

    setToken(srt_token){
        this.token = srt_token;

        return this;
    }

    newSign(obj_msg = null){
        if(isEmpty(obj_msg) && isEmpty(this.msg))
            throw "Sin datos de mensajes";

        obj_msg = isEmpty(obj_msg) ? this.msg : obj_msg;
        const {time:expiresIn, key} = this;
        return sign({'data' : obj_msg}, key, { expiresIn });
    }

    verify(srt_token = null){
        if(isEmpty(srt_token) && isEmpty(this.token))
            throw "Sin token";

        srt_token = isEmpty(srt_token) ? this.token : srt_token;
        const {key} = this;

        return verify(srt_token, key);
    }
}

module.exports = new Token();