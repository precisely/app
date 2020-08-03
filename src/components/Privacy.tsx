import * as React from "react";
import * as Router from "react-router";

import { Header1 } from "~/src/components/Header1";

import "./common.css";


export const Privacy = (props: Router.RouteComponentProps) => {

  return (
    <div>
      <Header1 location={props.location.pathname} />
      <div className="">
        <div className="h1">
          Privacy Policy
        </div>
        <div className="p-1">
          <p>
            Belli Fidenatis contagione inritati Ueientium animi et consanguinitate—nam Fidenates quoque Etrusci fuerunt—et quod ipsa propinquitas loci, si Romana arma omnibus infesta finitimis essent, stimulabat. In fines Romanos excucurrerunt populabundi magis quam iusti more belli. Itaque non castris positis, non exspectato hostium exercitu, raptam ex agris praedam portantes Ueios rediere. Romanus contra postquam hostem in agris non inuenit, dimicationi ultimae instructus intentusque Tiberim transit. Quem postquam castra ponere et ad urbem accessurum Ueientes audiuere, obuiam egressi ut potius acie decernerent quam inclusi de tectis moenibusque dimicarent. Ibi uiribus nulla arte adiutis, tantum ueterani robore exercitus rex Romanus uicit; persecutusque fusos ad moenia hostes, urbe ualida muris ac situ ipso munita abstinuit, agros rediens uastat, ulciscendi magis quam praedae studio; eaque clade haud minus quam aduersa pugna subacti Ueientes pacem petitum oratores Romam mittunt. Agri parte multatis in centum annos indutiae datae. Haec ferme Romulo regnante domi militiaeque gesta, quorum nihil absonum fidei diuinae originis diuinitatisque post mortem creditae fuit, non animus in regno auito reciperando, non condendae urbis consilium, non bello ac pace firmandae. Ab illo enim profecto uiribus datis tantum ualuit ut in quadraginta deinde annos tutam pacem haberet. Multitudini tamen gratior fuit quam patribus, longe ante alios acceptissimus militum animis; trecentosque armatos ad custodiam corporis quos Celeres appellauit non in bello solum sed etiam in pace habuit.
          </p>
          <p>
            His immortalibus editis operibus cum ad exercitum recensendum contionem in campo ad Caprae paludem haberet, subito coorta tempestas cum magno fragore tonitribusque tam denso regem operuit nimbo ut conspectum eius contioni abstulerit; nec deinde in terris Romulus fuit. Romana pubes sedato tandem pauore postquam ex tam turbido die serena et tranquilla lux rediit, ubi uacuam sedem regiam uidit, etsi satis credebat patribus qui proximi steterant sublimem raptum procella, tamen uelut orbitatis metu icta maestum aliquamdiu silentium obtinuit. Deinde a paucis initio facto, deum deo natum, regem parentemque urbis Romanae saluere uniuersi Romulum iubent; pacem precibus exposcunt, uti uolens propitius suam semper sospitet progeniem. Fuisse credo tum quoque aliquos qui discerptum regem patrum manibus taciti arguerent; manauit enim haec quoque sed perobscura fama; illam alteram admiratio uiri et pauor praesens nobilitauit. Et consilio etiam unius hominis addita rei dicitur fides. Namque Proculus Iulius, sollicita ciuitate desiderio regis et infensa patribus, grauis, ut traditur, quamuis magnae rei auctor in contionem prodit. 'Romulus' inquit, 'Quirites, parens urbis huius, prima hodierna luce caelo repente delapsus se mihi obuium dedit. Cum perfusus horrore uenerabundusque adstitissem petens precibus ut contra intueri fas esset, [7] "abi, nuntia" inquit "Romanis, caelestes ita uelle ut mea Roma caput orbis terrarum sit; proinde rem militarem colant sciantque et ita posteris tradant nullas opes humanas armis Romanis resistere posse. 'Haec' inquit 'locutus sublimis abiit.'" Mirum quantum illi uiro nuntianti haec fidei fuerit, quamque desiderium Romuli apud plebem exercitumque facta fide immortalitatis lenitum sit.
          </p>
        </div>
      </div>
    </div>
  );

};
