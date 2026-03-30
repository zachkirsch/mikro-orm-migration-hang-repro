import { Migration } from "@mikro-orm/migrations";

export class Migration20250101000000_AddEmailToUser extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user" add column "email" varchar(255);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "email";`);
  }
}
