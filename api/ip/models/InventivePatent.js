'use strict';
module.exports = (sequelize, DataTypes) => {
  const InventivePatent = sequelize.define("InventivePatent", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    tenant: { type: DataTypes.STRING, allowNull: true, comment: '租户' },
    ApplNo: { type: DataTypes.STRING, allowNull: true, comment: '申请号' },
    patentNumber: { type: DataTypes.STRING, allowNull: true, comment: '专利号' },
    publishNumber: { type: DataTypes.STRING, allowNull: true, unique: true, comment: '公开（公告）号' },
    certificateNumber: { type: DataTypes.STRING, allowNull: true, comment: '证书号' },
    patentName: { type: DataTypes.STRING, allowNull: true, comment: '发明名称' },
    patentType: { type: DataTypes.STRING, allowNull: true, comment: '专利类型' },
    patentTypeDesc: { type: DataTypes.STRING, allowNull: true, comment: '专利类型描述' },
    patentOwner: { type: DataTypes.STRING, allowNull: true, comment: '专利权人' },
    inventors: { type: DataTypes.STRING, allowNull: true, comment: '发明人' },
    patentReqDate: { type: DataTypes.DATE, allowNull: true, comment: '专利申请日' },
    publishDate: { type: DataTypes.DATE, allowNull: true, comment: '公开（公告）日' },
    filedDate: { type: DataTypes.DATE, allowNull: true, comment: '归档日期' },
    product: { type: DataTypes.STRING, allowNull: true, comment: '产品' },
    keyFeatures: { type: DataTypes.TEXT, allowNull: true, comment: '特征' },
    keyWord: { type: DataTypes.STRING, allowNull: true, comment: '关键词' },
    abstractDrawing: { type: DataTypes.STRING, allowNull: true, comment: '粗劣图' },
    classificationLevel1: { type: DataTypes.STRING, allowNull: true, comment: '一级分类' },
    classificationLevel1Code: { type: DataTypes.STRING, allowNull: true, comment: '一级分类' },
    classificationLevel2: { type: DataTypes.STRING, allowNull: true, comment: '二级分类' },
    classificationLevel2Code: { type: DataTypes.STRING, allowNull: true, comment: '二级分类' },
    classificationLevel3: { type: DataTypes.STRING, allowNull: true, comment: '三级分类' },
    classificationLevel3Code: { type: DataTypes.STRING, allowNull: true, comment: '三级分类' },
    classificationLevel4: { type: DataTypes.STRING, allowNull: true, comment: '四级分类' },
    classificationLevel4Code: { type: DataTypes.STRING, allowNull: true, comment: '四级分类' },
    pointSolution: { type: DataTypes.TEXT, allowNull: true, comment: '问题解决' },
    technicalEffect: { type: DataTypes.TEXT, allowNull: true, comment: '技术效果' },
    abstract: { type: DataTypes.TEXT, allowNull: true, comment: '摘要' },
    attachingFile: { type: DataTypes.STRING, allowNull: true, comment: '附件文档' },
    patentStatus: { type: DataTypes.STRING, allowNull: true, defaultValue: '10', comment: '专利状态' },
    status: { type: DataTypes.STRING, allowNull: true, defaultValue: '10', comment: '状态' },
    enabledFlag: { type: DataTypes.STRING, allowNull: true, comment: '启用标志' },
    createdBy: { type: DataTypes.STRING, allowNull: true, comment: '创建人(需拓展)' },
    updatedBy: { type: DataTypes.STRING, allowNull: true, comment: '更新人' },
  }, {
    tableName: 'inventivepatent',
    comment: ' 专利著作项',
  });
  return InventivePatent;
}