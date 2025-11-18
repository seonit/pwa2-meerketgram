/**
 * @file databases/migrations/20251118-10-fk-comments-post_id.js
 * @description Add fk on comments
 * 251118 v1.0.0 seon init
 */

const tableName = 'comments';

const constraintName = 'fk_comments_post_id';

const options = {
  fields: ['post_id'], // fk 부여할 컬럼
  type: 'foreign key', // constraint 종류
  name: constraintName, // constraint명 지정
  references: { // 참조 설정
    table: 'posts', // 참조할 테이블
    field: 'id', // 참조 컬럼 지정
  },
  onDelete: 'CASCADE', // 참조 레코드가 삭제 시, 같이 삭제    
};
/** @type {import('sequelize-cli').Migration} */
export default {
  // 마이그레이션 실행 시 호출되는 메소드 (스키마 생성, 수정)
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint(tableName, options);
  },

  // 마이그레이션을 롤백 시 호출되는 메소드(스키마 제거, 수정)
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(tableName, constraintName);
  }
  };
