const assert = require('node:assert/strict');
const {parse} = require('./invitation.js');
const p = {v:1,intentionId:'11111111-1111-4111-8111-111111111111',roomId:'22222222-2222-4222-8222-222222222222',titulo:'Oración 100% + & <script>',tipo:'oracion',key:Buffer.alloc(32,7).toString('base64'),maxParticipants:4,currentParticipants:1};
const fragment = x => '#invite='+Buffer.from(JSON.stringify(x)).toString('base64url');
assert.equal(parse(fragment(p)).payload.titulo,p.titulo);
assert.match(parse(fragment(p)).appLink,/^arde:\/\/join#invite=/);
for (const patch of [{v:2},{key:'bad'},{key:Buffer.alloc(16).toString('base64')},{intentionId:'bad'},{roomId:'bad'},{titulo:''},{tipo:null},{maxParticipants:0},{currentParticipants:-1}]) assert.throws(()=>parse(fragment({...p,...patch})));
for(const s of ['', '#invite=%', '#invite='+'a'.repeat(8193), '?id=legacy']) assert.throws(()=>parse(s));
console.log('PASS: 15 invitation/fallback checks');
