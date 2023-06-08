import React, { Component } from 'react';
import parse from 'html-react-parser';

class IntroV2 extends Component {

	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'

		return <div className="intro-area pd-top-75">
			<div className="container">

				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12">
							<div className="section-title">
								<h2 className="title text-center">¿No sabes que regalar? Obsequia una Tarjeta Regalo Ketzal app: seguro le atinas</h2>
								<p>
									En Ketzal app tenemos el regalo perfecto para cualquier ocasion. Si quieres acertar en tu próximo regalo,
									una tarjeta regalo de viaje es la opción ideal. Es perfecta para un cumpleaños, para unos novios
									que se casan, para sorprender en Navidad o en San Valentin, para el día del Padre y de la Madre…
									Sorprenderás y acertarás seguro. Regala el placer de viajar, de desconectar y de disfrutar de unas
									vacaciones a medida. Puedes elegir el importe que desees, personalizar la tarjeta a tu gusto y
									entregarla. Así de fácil y cómodo.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className=" col-xs-6 col-sm-6 col-lg-3 single-intro-two bl-0">
						<div className="single-intro style-two">
							<div className="thumb">
								<img src={publicUrl + "assets/img/icons/calendar.png"} alt="img" />
							</div>
							<h4 className="intro-title">CADUCIDAD</h4>
							<p>
								La persona obsequiada dispondrá de 12 meses para canjear la tarjeta
								regalo por cualquier viaje disponible en la página de Ketzal app.
							</p>
						</div>
					</div>
					<div className="col-xs-6	 col-sm-6  col-lg-3 single-intro-two">
						<div className="single-intro style-two">
							<div className="thumb">
								<img src={publicUrl + "assets/img/icons/edit.png"} alt="img" />
							</div>
							<h4 className="intro-title">PERSONALIZABLE</h4>
							<p>
								La tarjeta regalo se puede personalizar completamente según el motivo
								a celebrar y la persona destinataria. También eliges el importe a regalar
								y puedes añadir un mensaje.
							</p>
						</div>
					</div>
					<div className="col-lg-3 col-sm-6 single-intro-two">
						<div className="single-intro style-two">
							<div className="thumb">
								<img src={publicUrl + "assets/img/icons/gift.png"} alt="img" />
							</div>
							<h4 className="intro-title">FÁCIL Y CÓMODO</h4>
							<p>
								Resulta muy sencillo de configurar y enviar a la persona deseada.
								En cualquier momento y lugar, y en tan solo dos pasos tendrás lista
								la tarjeta regalo para entregar.
							</p>
						</div>
					</div>
					<div className="col-lg-3 col-sm-6 single-intro-two">
						<div className="single-intro style-two">
							<div className="thumb">
								<img src={publicUrl + "assets/img/icons/send.png"} alt="img" />
							</div>
							<h4 className="intro-title">ENVÍALA CUANDO QUIERAS</h4>
							<p>
								La tarjeta se puede tanto imprimir y regalar en mano, como enviar por correo electrónico.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default IntroV2