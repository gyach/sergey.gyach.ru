import { SlideLayout } from "../slide-layout";
import { SlideTail } from "../slide-tail";
import { SdlcQuestionsLink } from "./questions-link";

/** Результаты для читателей по hrl-analyze: SKILL.md, шаги 03–12 и test-plan.md. */
export function Slide07() {
  return (
    <SlideLayout number={7} title="Результаты аналитики" eyebrow="ТЕКУЩИЙ ПРОЦЕСС">
      <p className="lead small">
        Что готовит hrl-analyze и на какие вопросы отвечает каждый документ.
        Состав комплекта зависит от задачи.
      </p>
      <div className="artifact-groups">
        <section aria-labelledby="artifacts-core">
          <h2 id="artifacts-core">Постановка</h2>
          <p className="artifact-scope">Для разработки и QA · состав зависит от задачи</p>
          <dl>
            <div><dt>История</dt><dd>Чью проблему решаем? Каковы цель и границы?</dd></div>
            <div><dt>Техническая постановка</dt><dd>Каков план задач и ключевые архитектурные решения?</dd></div>
            <div><dt>Задачи на разработку</dt><dd>Что реализовать в каждой части работы?</dd></div>
          </dl>
          <div className="artifact-core-ending">
            <dl>
              <div><dt>Сводка изменений конфигурации</dt><dd>Какие настройки меняем, если это нужно?</dd></div>
              <div><dt>Диаграммы</dt><dd>Как связаны участники, данные и шаги процесса?</dd></div>
            </dl>
            <SdlcQuestionsLink />
          </div>
        </section>
        <section aria-labelledby="artifacts-release">
          <h2 id="artifacts-release">Выпуск и сопровождение</h2>
          <p className="artifact-scope">Когда применимо к изменению</p>
          <dl>
            <div><dt>Обзор функциональности</dt><dd>Как вся функция выглядит для пользователя?</dd></div>
            <div><dt>Рекомендации по развёртыванию</dt><dd>Как выпустить, проверить и откатить?</dd></div>
            <div><dt>Инструкция при сбоях</dt><dd>Как найти причину сбоя и восстановить работу?</dd></div>
            <div><dt>Руководство для поддержки</dt><dd>Что отвечать клиенту, как объяснять ошибки?</dd></div>
            <div><dt>Руководство по внедрению</dt><dd>Что сделать на стороне клиента?</dd></div>
            <div><dt>Описание релиза для клиентов</dt><dd>Что изменилось и что делать пользователю?</dd></div>
            <div><dt>Описание релиза для коллег</dt><dd>Что учесть разработке, QA, DevOps и поддержке?</dd></div>
          </dl>
        </section>
      </div>
      <p className="artifact-service-note">
        <strong>Служебные артефакты:</strong> контекст, решения, открытые вопросы, состояние работы, трассировка, отчёты ревью и уточнения глоссария.
      </p>
      <p className="artifact-learnings">
        <strong>Самообучение навыков · learnings:</strong> корректировки → выводы → улучшение инструкций по команде человека.
      </p>
      <SlideTail next="Далее: передача задачи в разработку и публикация." />
    </SlideLayout>
  );
}
