import { GetMentoringSlotByMissedService } from './../../../../src/modules/mentoring-slot/domain/service/use-case/get-mentoring-slots-by-missed.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';

import DataSource from '@src/modules/database/config/typeorm.config';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';

describe('Get Missed Mentoring Slots', () => {
    // creer l'app de test
    // creer la bdd de test
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return any missed mentoring slots if there in no missed mentoring slots in DB',async () => {

        // envyer une requête http sur l'url api/mentoring-slots/was-missed
        // récupérer la reponse http
        const getMentoringSlotByMissedResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/was-missed');

        console.log(getMentoringSlotByMissedResponse.error);
        // vérifier que la réponse a bien un status 200
        expect(getMentoringSlotByMissedResponse.status).toBe(200);

        // vérifier la réponse a bien un body avec un tableau vide
        expect(getMentoringSlotByMissedResponse.body).toEqual([]);
        expect(getMentoringSlotByMissedResponse.body.length).toBe(0);
    })
})