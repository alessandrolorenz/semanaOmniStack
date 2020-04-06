const connection = require('../database/connection');

module.exports = {

  async index(req, res) {
    const { page = 1 } = req.query; //query opcional default 1

    const [ count ] = await connection('incidents').count();

    console.log(count);

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page -1) * 5)
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
    ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  // dados de autenticação geralmente vêm pelo header
  async create(req, res){
    const {title, description, value} = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({ //como inseriu apenas um retorna um [] com um so registro, pra pegar o id retorno[0].id... ou [id] desentruturacao
      title, 
      description, 
      value,
      ong_id
    });
    return res.json({ id }); // com {} nai o nome da chave, senão só o id
  },

  async delete(req, res) {


        const {id} = req.params;
        const ong_id = req.headers.authorization;
    
        const incident = await connection('incidents')
          .where('id', id)
          .select('ong_id')
          .first()

        if(incident.ong_id != ong_id) {
          res.status(400).json({error: 'Operation not commited.'});
        } else {
          await connection('incidents').where('id', id).delete();
        }
        return res.status(204).send();
      }


}