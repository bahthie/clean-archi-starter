import MentoringSlotRepository from "@src/modules/mentoring-slot/infrastructure/db/repository/mentoring-slot.repository";
import MentoringSlot from "../../model/entity/mentoring-slot.entity";

export class GetMentoringSlotByMissedService {
    constructor(private mentoringSloatRepository: MentoringSlotRepository){}
    async getMentoringSlotByMissed(): Promise<MentoringSlot[]> {
        const mentoringslots = await this.mentoringSloatRepository.findMentoringSloatsByMissed();
        return mentoringslots;
    }
}