import * as React from "react";
import * as Router from "react-router";

import { Header } from "~/src/components/landing/Header";

import "./common.css";


export const Terms = (props: Router.RouteComponentProps<void>) => {

  return (
    <div>
      <Header location={props.location.pathname} />
      <div className="">
        <div className="h1">
          Terms and Conditions
        </div>
        <div className="p-1 text-sm">
          <p>
            Tum Sabinae mulieres, quarum ex iniuria bellum ortum erat, crinibus passis scissaque ueste, uicto malis muliebri pauore, ausae se inter tela uolantia inferre, ex transuerso impetu facto dirimere infestas acies, dirimere iras, hinc patres, hinc uiros orantes, ne sanguine se nefando soceri generique respergerent, ne parricidio macularent partus suos, nepotum illi, hi liberum progeniem. 'Si adfinitatis inter uos, si conubii piget, in nos uertite iras; nos causa belli, nos uolnerum ac caedium uiris ac parentibus sumus; melius peribimus quam sine alteris uestrum uiduae aut orbae uiuemus.' Mouet res cum multitudinem tum duces; silentium et repentina fit quies; inde ad foedus faciendum duces prodeunt. Nec pacem modo sed ciuitatem unam ex duabus faciunt. Regnum consociant: imperium omne conferunt Romam. Ita geminata urbe ut Sabinis tamen aliquid daretur Quirites a Curibus appellati. Monumentum eius pugnae, ubi primum ex profunda emersus palude equus Curtium in uado statuit, Curtium lacum appellarunt. Ex bello tam tristi laeta repente pax cariores Sabinas uiris ac parentibus et ante omnes Romulo ipsi fecit. Itaque cum populum in curias triginta diuideret, nomina earum curiis imposuit. Id non traditur, cum haud dubie aliquanto numerus maior hoc mulierum fuerit, aetate an dignitatibus suis uirorumue an sorte lectae sint, quae nomina curiis darent. Eodem tempore et centuriae tres equitum conscriptae sunt. Ramnenses ab Romulo, ab T. Tatio Titienses appellati: Lucerum nominis et originis causa incerta est. Inde non modo commune sed concors etiam regnum duobus regibus fuit.
          </p>
          <p>
            Post aliquot annos propinqui regis Tati legatos Laurentium pulsant; cumque Laurentes iure gentium agerent, apud Tatium gratia suorum et preces plus poterant. Igitur illorum poenam in se uertit; nam Lauinii cum ad sollemne sacrificium eo uenisset concursu facto interficitur. Eam rem minus aegre quam dignum erat tulisse Romulum ferunt, seu ob infidam societatem regni seu quia haud iniuria caesum credebat. Itaque bello quidem abstinuit; ut tamen expiarentur legatorum iniuriae regisque caedes, foedus inter Romam Lauiniumque urbes renouatum est. Et cum his quidem insperata pax erat: aliud multo propius atque in ipsis prope portis bellum ortum. Fidenates nimis uicinas prope se conualescere opes rati, priusquam tantum roboris esset quantum futurum apparebat, occupant bellum facere. Iuuentute armata immissa uastatur agri quod inter urbem ac Fidenas est; inde ad laeuam uersi quia dextra Tiberis arcebat, cum magna trepidatione agrestium populantur, tumultusque repens ex agris in urbem inlatus pro nuntio fuit. Excitus Romulus—neque enim dilationem pati tam uicinum bellum poterat—exercitum educit, castra a Fidenis mille passuum locat. Ibi modico praesidio relicto, egressus omnibus copiis partem militum locis circa densa obsita uirgulta obscuris subsidere in insidiis iussit: cum parte maiore atque omni equitatu profectus, id quod quaerebat, tumultuoso et minaci genere pugnae adequitando ipsis prope portis hostem exciuit. Fugae quoque, quae simulanda erat, eadem equestris pugna causam minus mirabilem dedit. Et cum, uelut inter pugnae fugaeque consilium trepidante equitatu, pedes quoque referret gradum, plenis repente portis effusi hostes impulsa Romana acie studio instandi sequendique trahuntur ad locum insidiarum. Inde subito exorti Romani transuersam inuadunt hostium aciem; addunt pauorem mota e castris signa eorum qui in praesidio relicti fuerant. Ita multiplici terrore perculsi Fidenates prius paene, quam Romulus quique Cum eo uisi erant circumagerent frenis equos, terga uertunt; multoque effusius, quippe uera fuga, qui simulantes paulo ante secuti erant oppidum repetebant. Non tamen eripuere se hosti: haerens in tergo Romanus, priusquam fores portarum obicerentur, uelut agmine uno inrumpit.
          </p>
        </div>
      </div>
    </div>
  );

};
