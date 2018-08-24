import should from 'should';

function add(a, b) {
    return a + b;
}

// on crée des groupes (describe)
// 'it' , c'est un test
//on install chai / should : il ajoute une méthode 'should' sur l'objet
describe('premier groupe de test', () => {

    it('test add with numbers', () => {
        should.equal(add(2, 2), 4);
    });

    it('test add with string', ()=>{
        should.equal(add('yo', ' bitch'), 'yo bitch');
    });

});