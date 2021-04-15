"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var multicast_dns_1 = __importDefault(require("multicast-dns"));
var mdns = new multicast_dns_1.default();
mdns.on('response', function (response) {
    var answers = response.answers;
    if (Array.isArray(answers)) {
        answers.map(function (item) {
            var tmp = item.data.toString();
            if (item.type === 'TXT') {
                var arr = tmp.split(/(?<!\{.*),(?!\}.*)/);
                console.log('Jia ~ file: index.ts ~ line 13 ~ answers.map ~ arr', arr);
                var data_1 = {};
                arr.map(function (str) {
                    var _a = __read(str.split('='), 2), key = _a[0], value = _a[1];
                    data_1[key] = value;
                });
                console.log(item.type, '\t', JSON.stringify(data_1, null, 2));
            }
            else if (item.type === 'SRV') {
                console.log(item.type, '\t', JSON.stringify(item.data, null, 2));
            }
            else {
                console.log(item.type, '\t', item.data.toString());
            }
        });
    }
});
// mdns.on('query', function (query: any) {
//     console.log('got a query packet:', query.questions[0]);
// });
// // lets query for an A record for 'brunhilde.local'
mdns.query({
    questions: [
        {
            name: '_ewelink._tcp.local',
            type: 'PTR',
        },
    ],
}, function () {
    console.log(123);
});
// mdns.respond(
//     {
//         answers: [
//             {
//                 name: 'brunhilde.local',
//                 type: 'PTR',
//                 ttl: 1,
//                 data: '123',
//             },
//         ],
//     },
//     () => {
//         console.log('456');
//     }
// );
