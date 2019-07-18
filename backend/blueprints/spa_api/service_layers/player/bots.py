from backend.blueprints.spa_api.service_layers.utils import with_session
from backend.database.objects import PlayerGame


@with_session
def get_bots(session=None):
    return session.query(PlayerGame.name, PlayerGame.player).filter(PlayerGame.is_bot==True).distinct(PlayerGame.player).all()