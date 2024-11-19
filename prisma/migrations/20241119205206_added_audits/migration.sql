-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'not-set';

-- CreateTable
CREATE TABLE "PromptsOnAudits" (
    "promptId" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,

    CONSTRAINT "PromptsOnAudits_pkey" PRIMARY KEY ("promptId","auditId")
);

-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PromptsOnAudits" ADD CONSTRAINT "PromptsOnAudits_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptsOnAudits" ADD CONSTRAINT "PromptsOnAudits_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
