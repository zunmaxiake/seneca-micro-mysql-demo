module.exports.config = {
  db:{
  url: 'mysql://root:123456@139.224.225.71:3306/poetrydb',
  defult: {
    pool: {
      max: 5,
      idle: 30000, //连接最大空置时间（毫秒），超时后将释放连接
      acquire: 60000,
    },
    logging: false,
    timestamps: true,
    // operatorsAliases: true,
    //转换列名的驼峰命名规则为下划线命令规则
    //underscored: 为true时，生成的外键是蛇形命名，false为驼峰命名，中微统一为蛇形命名,全局变量，具体到model还可以定义。
    underscored: false,
    //sync: {alter: true},
    //设置为 true，会在创建表前先删除原表;false,不删除原表，
    //hooks为true时，可以使用钩子函数
    sync: { force: false, hooks: true },
    timezone: '+08:00',
    //charset: 'utf8',
    //collate: 'utf8mb4_unicode_ci',
  }
}
};
